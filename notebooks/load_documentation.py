# Load data from Shaped documentation into a table

import os
import re
import json
import uuid
import pandas as pd
from pathlib import Path
from datetime import datetime
from langchain_text_splitters import MarkdownHeaderTextSplitter
from typing import Tuple, List, Dict

TABLE_ID = 'shaped_documentation'
DOCS_DIR = Path(__file__).parent / 'data' / 'raw' / 'docs'
OUTPUT_FILE = Path(__file__).parent / 'data' / 'shaped_documentation.jsonl'


def extract_frontmatter(content: str) -> Tuple[dict, str]:
    """Extract YAML frontmatter and return metadata + remaining content"""
    frontmatter = {}
    remaining_content = content
    
    # Check if content starts with ---
    if content.startswith('---\n'):
        # Find the closing ---
        match = re.match(r'^---\n(.*?)\n---\n', content, re.DOTALL)
        if match:
            frontmatter_text = match.group(1)
            remaining_content = content[match.end():]
            
            # Parse simple YAML fields (title, sidebar_position, etc.)
            for line in frontmatter_text.split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    key = key.strip()
                    value = value.strip().strip('"').strip("'")
                    frontmatter[key] = value
    
    return frontmatter, remaining_content


def remove_imports(content: str) -> str:
    """Remove import statements from MDX"""
    # Remove lines that start with 'import'
    lines = content.split('\n')
    filtered_lines = [line for line in lines if not line.strip().startswith('import ')]
    return '\n'.join(filtered_lines)


def process_tabs(content: str) -> str:
    """Replace Tabs/TabItem with markdown headers"""
    
    # First, extract the label mappings from Tabs components
    def extract_tab_labels(tabs_content: str) -> Dict[str, str]:
        """Extract value->label mapping from Tabs component"""
        labels = {}
        # Find the values array - handle JSX syntax values={[...]}
        values_match = re.search(r'values=\{\[\s*(.*?)\s*\]\}', tabs_content, re.DOTALL)
        if values_match:
            values_content = values_match.group(1)
            # Extract each { label: '...', value: '...' } object - handle both orders
            # Pattern 1: { label: '...', value: '...' }
            item_pattern1 = r'\{\s*label:\s*["\']([^"\']+)["\']\s*,\s*value:\s*["\']([^"\']+)["\']\s*\}'
            for match in re.finditer(item_pattern1, values_content, re.DOTALL):
                label, value = match.groups()
                labels[value] = label
            # Pattern 2: { value: '...', label: '...' }
            item_pattern2 = r'\{\s*value:\s*["\']([^"\']+)["\']\s*,\s*label:\s*["\']([^"\']+)["\']\s*\}'
            for match in re.finditer(item_pattern2, values_content, re.DOTALL):
                value, label = match.groups()
                labels[value] = label
        return labels
    
    # Process all Tabs components
    while '<Tabs' in content:
        # Find the opening <Tabs> tag and its content
        tabs_start = content.find('<Tabs')
        if tabs_start == -1:
            break
        
        # Find the closing </Tabs>
        tabs_end = content.find('</Tabs>', tabs_start)
        if tabs_end == -1:
            break
        
        tabs_block = content[tabs_start:tabs_end + 7]
        
        # Extract label mappings
        labels = extract_tab_labels(tabs_block)
        
        # Process TabItem components within this block
        processed_content = []
        tab_items = re.finditer(r'<TabItem\s+value=["\']([^"\']+)["\']\s*>(.*?)</TabItem>', tabs_block, re.DOTALL)
        
        for tab_match in tab_items:
            value, inner_content = tab_match.groups()
            label = labels.get(value, value.capitalize())
            # Add the header and content
            processed_content.append(f'\n### {label}\n{inner_content.strip()}\n')
        
        # Replace the entire Tabs block with processed content
        replacement = '\n'.join(processed_content)
        content = content[:tabs_start] + replacement + content[tabs_end + 7:]
    
    return content


def remove_images(content: str) -> str:
    """Remove image components and markdown images"""
    # Remove JSX-style image components (multi-line)
    content = re.sub(r'<\w+Svg[^>]*>.*?</\w+Svg>', '', content, flags=re.DOTALL)
    content = re.sub(r'<\w+Svg[^>]*/>', '', content)
    content = re.sub(r'<ThemedSvg[^>]*>', '', content)
    content = re.sub(r'<Image[^>]*>', '', content)
    content = re.sub(r'<img[^>]*/?>', '', content)
    
    # Remove markdown images
    content = re.sub(r'!\[.*?\]\([^)]+\)', '', content)
    
    return content


def replace_cards(content: str) -> str:
    """Replace Card components with h4 headers"""
    # Match <Card ... title='...' description='...' />
    def card_replacer(match):
        card_content = match.group(0)
        title_match = re.search(r'title=["\']([^"\']+)["\']', card_content)
        desc_match = re.search(r'description=["\']([^"\']+)["\']', card_content)
        
        result = []
        if title_match:
            result.append(f'#### {title_match.group(1)}')
        if desc_match:
            result.append(desc_match.group(1))
        
        return '\n'.join(result) if result else ''
    
    content = re.sub(r'<Card[^>]*/?>', card_replacer, content)
    return content


def clean_artifacts(content: str) -> str:
    """Remove highlight comments, callouts, and other JSX artifacts"""
    # Remove highlight comments
    content = re.sub(r'//highlight-start\n?', '', content)
    content = re.sub(r'//highlight-end\n?', '', content)
    content = re.sub(r'//highlight-next-line\n?', '', content)
    
    # Remove docusaurus callouts - keep the content but remove the markup
    content = re.sub(r':::tip\n?', '\n**Tip:** ', content)
    content = re.sub(r':::note\n?', '\n**Note:** ', content)
    content = re.sub(r':::warning\n?', '\n**Warning:** ', content)
    content = re.sub(r':::info\n?', '\n**Info:** ', content)
    content = re.sub(r':::\n?', '\n', content)
    
    # Remove HTML section/article tags
    content = re.sub(r'</?section[^>]*>', '', content)
    content = re.sub(r'</?article[^>]*>', '', content)
    content = re.sub(r'</?div[^>]*>', '', content)
    
    # Clean up multiple blank lines
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    return content


def preprocess_file(file_path: Path) -> Tuple[str, str]:
    """Apply all preprocessing steps and return (processed_content, document_title)"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Step 1: Extract frontmatter
    frontmatter, content = extract_frontmatter(content)
    document_title = frontmatter.get('title', '')
    
    # If there's a title in frontmatter, add it as H1 if not already present
    if document_title and not content.strip().startswith('#'):
        content = f'# {document_title}\n\n{content}'
    
    # If no title in frontmatter, try to extract from first H1
    if not document_title:
        h1_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        if h1_match:
            document_title = h1_match.group(1).strip()
    
    # Step 2: Remove imports
    content = remove_imports(content)
    
    # Step 3: Process tabs
    content = process_tabs(content)
    
    # Step 4: Remove images
    content = remove_images(content)
    
    # Step 5: Replace cards
    content = replace_cards(content)
    
    # Step 6: Clean artifacts
    content = clean_artifacts(content)
    
    return content.strip(), document_title


def chunk_content(content: str, file_path: Path, document_title: str) -> List[Dict]:
    """Split content into chunks with metadata"""
    headers_to_split_on = [
        ("#", "Header 1"),
        ("##", "Header 2"),
        ("###", "Header 3"),
        ("####", "Header 4"),
    ]
    
    splitter = MarkdownHeaderTextSplitter(
        headers_to_split_on=headers_to_split_on,
        strip_headers=False
    )
    
    try:
        splits = splitter.split_text(content)
    except Exception as e:
        print(f"Warning: Error splitting {file_path}: {e}")
        # Fallback: create a single chunk with all content
        splits = [type('Document', (), {'page_content': content, 'metadata': {}})()]
    
    chunks = []
    relative_path = file_path.relative_to(DOCS_DIR)
    
    for idx, split in enumerate(splits):
        # Extract header hierarchy from metadata
        metadata = split.metadata if hasattr(split, 'metadata') else {}
        
        h1 = metadata.get('Header 1', '')
        h2 = metadata.get('Header 2', '')
        h3 = metadata.get('Header 3', '')
        h4 = metadata.get('Header 4', '')
        
        # Generate deterministic UUID from file path and chunk index
        chunk_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{relative_path}:{idx}"))
        
        now_str = datetime.now().isoformat()
        
        chunk = {
            'id': chunk_id,
            'content': split.page_content.strip(),
            'document_title': document_title,
            'h1': h1,
            'h2': h2,
            'h3': h3,
            'h4': h4,
            'file_path': str(relative_path),
            'absolute_path': str(file_path),
            'chunk_metadata': json.dumps(metadata),
            'created_at': now_str,
            'updated_at': now_str,
        }
        
        chunks.append(chunk)
    
    return chunks


def process_all_docs() -> pd.DataFrame:
    """Main function to process all documentation"""
    all_chunks = []
    processed_files = 0
    failed_files = []
    
    # Find all .md and .mdx files
    md_files = list(DOCS_DIR.rglob('*.md'))
    mdx_files = list(DOCS_DIR.rglob('*.mdx'))
    all_files = md_files + mdx_files
    
    print(f"Found {len(all_files)} documentation files ({len(mdx_files)} .mdx, {len(md_files)} .md)")
    
    for file_path in all_files:
        try:
            # Preprocess the file
            processed_content, document_title = preprocess_file(file_path)
            
            # Chunk the content
            chunks = chunk_content(processed_content, file_path, document_title)
            all_chunks.extend(chunks)
            
            processed_files += 1
            
            if processed_files % 10 == 0:
                print(f"Processed {processed_files}/{len(all_files)} files...")
                
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
            failed_files.append((file_path, str(e)))
    
    # Create DataFrame
    df = pd.DataFrame(all_chunks)
    
    # Print summary
    print("\n" + "="*60)
    print(f"Processing complete!")
    print(f"Total files processed: {processed_files}/{len(all_files)}")
    print(f"Total chunks created: {len(df)}")
    print(f"Average chunks per file: {len(df)/processed_files:.1f}")
    
    if failed_files:
        print(f"\nFailed files ({len(failed_files)}):")
        for path, error in failed_files:
            print(f"  - {path}: {error}")
    
    print("="*60 + "\n")
    
    return df


if __name__ == '__main__':
    df = process_all_docs()
    
    # Save to JSONL
    df.to_json(OUTPUT_FILE, orient='records', lines=True)
    print(f"Saved to {OUTPUT_FILE}")
    
    # Optionally save to JSON for inspection
    json_file = OUTPUT_FILE.with_suffix('.json')
    df.to_json(json_file, orient='records', indent=2)
    print(f"Also saved to {json_file} (for inspection)")
    
    # Show sample of the data
    print("\nSample chunk:")
    print("-" * 60)
    sample = df.iloc[0]
    for col in ['document_title', 'h1', 'h2', 'h3', 'h4', 'file_path']:
        print(f"{col}: {sample[col]}")
    print(f"content (first 200 chars): {sample['content'][:200]}...")
    print("-" * 60)
