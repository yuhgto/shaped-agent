# Load API documentation into chunks for Shaped semantic search

import re
import uuid
import pandas as pd
from pathlib import Path
from datetime import datetime
from langchain_text_splitters import MarkdownHeaderTextSplitter
from typing import Tuple, List, Dict

API_DOCS_FILE = Path(__file__).parent / 'data' / 'api-docs.md'
OUTPUT_FILE = Path(__file__).parent / 'data' / 'api_docs_chunked.jsonl'


def extract_frontmatter(content: str) -> Tuple[dict, str]:
    """Extract YAML frontmatter and return metadata + remaining content"""
    frontmatter = {}
    remaining_content = content

    if content.startswith('---\n'):
        match = re.match(r'^---\n(.*?)\n---\n', content, re.DOTALL)
        if match:
            frontmatter_text = match.group(1)
            remaining_content = content[match.end():]

            for line in frontmatter_text.split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    key = key.strip()
                    value = value.strip().strip('"').strip("'")
                    frontmatter[key] = value

    return frontmatter, remaining_content


def convert_html_headers_to_markdown(content: str) -> str:
    """Convert HTML headers to markdown so MarkdownHeaderTextSplitter can parse them"""
    # h1 -> #, h2 -> ##, h3 -> ###, h4 -> #### (strip whitespace from header text)
    def replacer(prefix):
        return lambda m: f'{prefix} {m.group(1).strip()}'

    content = re.sub(r'<h1[^>]*>(.*?)</h1>', replacer('#'), content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<h2[^>]*>(.*?)</h2>', replacer('##'), content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<h3[^>]*>(.*?)</h3>', replacer('###'), content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<h4[^>]*>(.*?)</h4>', replacer('####'), content, flags=re.DOTALL | re.IGNORECASE)

    return content


def preprocess_content(content: str) -> Tuple[str, str]:
    """Apply preprocessing and return (processed_content, document_title)"""
    frontmatter, content = extract_frontmatter(content)
    document_title = frontmatter.get('title', 'Shaped API v2.0.8')

    # Convert HTML headers to markdown for proper chunking
    content = convert_html_headers_to_markdown(content)

    # If no title in frontmatter, try to extract from first H1
    if not document_title:
        h1_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        if h1_match:
            document_title = h1_match.group(1).strip()

    # Clean up multiple blank lines
    content = re.sub(r'\n{3,}', '\n\n', content)

    return content.strip(), document_title


def extract_endpoint_metadata(content: str) -> Dict[str, str]:
    """Extract HTTP method and path from endpoint content.
    Looks for patterns like `POST /tables` or `GET /engines/{name}`"""
    # Pattern: backtick, method, space, path, backtick
    method_pattern = r'`(GET|POST|PATCH|DELETE|PUT)\s+([^\s`]+)`'
    match = re.search(method_pattern, content)
    if match:
        return {
            'http_method': match.group(1),
            'endpoint_path': match.group(2)
        }
    return {'http_method': '', 'endpoint_path': ''}


def chunk_content(content: str, document_title: str, file_path: str) -> List[Dict]:
    """Split content into chunks with metadata using MarkdownHeaderTextSplitter"""
    headers_to_split_on = [
        ("#", "Header 1"),
        ("##", "Header 2"),
        ("###", "Header 3"),
    ]

    splitter = MarkdownHeaderTextSplitter(
        headers_to_split_on=headers_to_split_on,
        strip_headers=False
    )

    try:
        splits = splitter.split_text(content)
    except Exception as e:
        print(f"Warning: Error splitting content: {e}")
        splits = [type('Document', (), {'page_content': content, 'metadata': {}})()]

    chunks = []
    now_str = datetime.now().isoformat()

    for idx, split in enumerate(splits):
        metadata = split.metadata if hasattr(split, 'metadata') else {}
        endpoint_meta = extract_endpoint_metadata(split.page_content)

        # Generate deterministic UUID from file path and chunk index
        chunk_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{file_path}:{idx}"))

        chunk = {
            'id': chunk_id,
            'content': split.page_content.strip(),
            'document_title': document_title,
            'api_section': metadata.get('Header 1', ''),
            'endpoint_name': metadata.get('Header 2', ''),
            'subsection': metadata.get('Header 3', ''),
            'http_method': endpoint_meta['http_method'],
            'endpoint_path': endpoint_meta['endpoint_path'],
            'file_path': file_path,
            'chunk_index': idx,
            'created_at': now_str,
            'updated_at': now_str,
        }
        chunks.append(chunk)

    return chunks


def process_api_docs() -> pd.DataFrame:
    """Main function to process API documentation file"""
    if not API_DOCS_FILE.exists():
        raise FileNotFoundError(f"API docs file not found: {API_DOCS_FILE}")

    with open(API_DOCS_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Preprocess
    processed_content, document_title = preprocess_content(content)

    # Chunk
    chunks = chunk_content(
        processed_content,
        document_title=document_title,
        file_path='api-docs.md'
    )

    df = pd.DataFrame(chunks)

    # Print summary
    print("\n" + "=" * 60)
    print("Processing complete!")
    print(f"Total chunks created: {len(df)}")
    print(f"Document title: {document_title}")
    print("=" * 60 + "\n")

    return df


if __name__ == '__main__':
    df = process_api_docs()

    # Save to JSONL (primary output for Shaped ingestion)
    df.to_json(OUTPUT_FILE, orient='records', lines=True)
    print(f"Saved to {OUTPUT_FILE}")

    # Save to JSON for inspection
    json_file = OUTPUT_FILE.with_suffix('.json')
    df.to_json(json_file, orient='records', indent=2)
    print(f"Also saved to {json_file} (for inspection)")

    # Show sample of the data
    print("\nSample chunk:")
    print("-" * 60)
    sample = df.iloc[0]
    for col in ['document_title', 'api_section', 'endpoint_name', 'subsection',
                'http_method', 'endpoint_path', 'file_path']:
        print(f"{col}: {sample[col]}")
    print(f"content (first 200 chars): {sample['content'][:200]}...")
    print("-" * 60)
