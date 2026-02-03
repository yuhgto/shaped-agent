# Building an Agent Series - Documentation chunking

As part of Retrieval-Augmented February, we built an AI assistant for our documentation and writing code snippets. 

Building a documentation Q&A bot sounds straightforward until you actually try it. Most tutorials skip over a critical step: real documentation isn't clean markdown. It's MDX files with JSX components, YAML frontmatter, tab interfaces, cards, and UI artifacts that will destroy your embeddings if you don't clean them first.

When we built a Q&A bot for Shaped's documentation, we couldn't just throw raw files into a vector database. We needed a pipeline that would strip out UI components, preserve semantic structure, and chunk content intelligently based on meaning rather than arbitrary token limits.

This post walks through the production code we use to transform MDX documentation into clean, semantically-meaningful chunks ready for a RAG pipeline.

---

## High-Level Flow

Here's what the pipeline does:

```
Raw MDX Files
    ↓
Extract YAML frontmatter (title, metadata)
    ↓
Remove JSX imports and components
    ↓
Transform tabs/cards into markdown
    ↓
Strip images and UI artifacts
    ↓
Chunk by header hierarchy (semantic boundaries)
    ↓
Generate stable UUIDs for each chunk
    ↓
JSONL Output (ready for vector DB)
```

Each transformation is a separate function. This makes the pipeline debuggable and extensible.

---

## The Deep Dive: Function by Function

### 1. Extracting Frontmatter

MDX files start with YAML frontmatter containing metadata. We extract this to get document titles without including it in our content chunks.

```python
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
```

We use regex to find content between `---` delimiters, then parse each line as a key-value pair. The document title gets stored as metadata while the content moves to the next step.

---

### 2. Removing Import Statements

MDX files import React components that are meaningless as text:

```python
def remove_imports(content: str) -> str:
    """Remove import statements from MDX"""
    lines = content.split('\n')
    filtered_lines = [line for line in lines if not line.strip().startswith('import ')]
    return '\n'.join(filtered_lines)
```

Import statements like `import TabItem from '@theme/TabItem'` pollute embeddings with irrelevant tokens. This function strips them out.

---

### 3. Processing Tabs into Headers

We use tab components in our documentation to show different code samples (Python vs. JavaScript, for example). These need to be converted to markdown sections that preserve the content while removing the JSX.

```python
def process_tabs(content: str) -> str:
    """Replace Tabs/TabItem with markdown headers"""
    
    def extract_tab_labels(tabs_content: str) -> Dict[str, str]:
        """Extract value->label mapping from Tabs component"""
        labels = {}
        values_match = re.search(r'values=\{\[\s*(.*?)\s*\]\}', tabs_content, re.DOTALL)
        if values_match:
            values_content = values_match.group(1)
            # Handle both { label: '...', value: '...' } orderings
            item_pattern1 = r'\{\s*label:\s*["\']([^"\']+)["\']\s*,\s*value:\s*["\']([^"\']+)["\']\s*\}'
            for match in re.finditer(item_pattern1, values_content, re.DOTALL):
                label, value = match.groups()
                labels[value] = label
        return labels
    
    while '<Tabs' in content:
        tabs_start = content.find('<Tabs')
        tabs_end = content.find('</Tabs>', tabs_start)
        tabs_block = content[tabs_start:tabs_end + 7]
        
        labels = extract_tab_labels(tabs_block)
        processed_content = []
        tab_items = re.finditer(r'<TabItem\s+value=["\']([^"\']+)["\']\s*>(.*?)</TabItem>', 
                                tabs_block, re.DOTALL)
        
        for tab_match in tab_items:
            value, inner_content = tab_match.groups()
            label = labels.get(value, value.capitalize())
            processed_content.append(f'\n### {label}\n{inner_content.strip()}\n')
        
        replacement = '\n'.join(processed_content)
        content = content[:tabs_start] + replacement + content[tabs_end + 7:]
    
    return content
```

The function parses the JSX to extract tab labels, then replaces the entire `<Tabs>` component with markdown headers (###) for each tab. This preserves the code examples while making them embeddable.

---

### 4. Removing Images

Images don't help with text embeddings and take up token space:

```python
def remove_images(content: str) -> str:
    """Remove image components and markdown images"""
    # Remove JSX-style image components
    content = re.sub(r'<\w+Svg[^>]*>.*?</\w+Svg>', '', content, flags=re.DOTALL)
    content = re.sub(r'<\w+Svg[^>]*/>', '', content)
    content = re.sub(r'<ThemedSvg[^>]*>', '', content)
    content = re.sub(r'<Image[^>]*>', '', content)
    content = re.sub(r'<img[^>]*/?>', '', content)
    
    # Remove markdown images
    content = re.sub(r'!\[.*?\]\([^)]+\)', '', content)
    
    return content
```

We strip both JSX image components and markdown image syntax. Alt text could potentially be kept, but we found it added more noise than signal.

---

### 5. Replacing Cards with Headers

Card components are UI elements that display titles and descriptions. We convert these to h4 headers:

```python
def replace_cards(content: str) -> str:
    """Replace Card components with h4 headers"""
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
```

The replacer function extracts the title and description attributes, then formats them as markdown.

---

### 6. Cleaning Artifacts

Docusaurus and other frameworks add highlighting comments and callout boxes:

```python
def clean_artifacts(content: str) -> str:
    """Remove highlight comments, callouts, and other JSX artifacts"""
    # Remove highlight comments
    content = re.sub(r'//highlight-start\n?', '', content)
    content = re.sub(r'//highlight-end\n?', '', content)
    content = re.sub(r'//highlight-next-line\n?', '', content)
    
    # Remove docusaurus callouts - keep content but remove markup
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
```

We preserve the semantic meaning of callouts (converting `:::tip` to `**Tip:**`) while removing the syntax that would confuse embeddings.

---

### 7. Orchestrating Preprocessing

The `preprocess_file` function chains all transformations together:

```python
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
    
    # Step 2-6: Apply transformations
    content = remove_imports(content)
    content = process_tabs(content)
    content = remove_images(content)
    content = replace_cards(content)
    content = clean_artifacts(content)
    
    return content.strip(), document_title
```

Each step builds on the previous one. The order matters—for example, we remove imports before processing tabs because tab components might have import statements above them.

---

### 8. Chunking by Header Hierarchy

This is the critical step for RAG quality. We chunk at header boundaries to maintain semantic meaning.

```python
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
        splits = [type('Document', (), {'page_content': content, 'metadata': {}})()]
    
    chunks = []
    relative_path = file_path.relative_to(DOCS_DIR)
    
    for idx, split in enumerate(splits):
        metadata = split.metadata if hasattr(split, 'metadata') else {}
        
        h1 = metadata.get('Header 1', '')
        h2 = metadata.get('Header 2', '')
        h3 = metadata.get('Header 3', '')
        h4 = metadata.get('Header 4', '')
        
        # Generate deterministic UUID from file path and chunk index
        chunk_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{relative_path}:{idx}"))
        
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
            'created_at': datetime.now().isoformat(),
            'updated_at': datetime.now().isoformat(),
        }
        
        chunks.append(chunk)
    
    return chunks
```

**Why chunk by headers?** We initially tried sentence-level chunking, but the results were too specific. The LLM couldn't get enough context to provide useful answers. Header-based chunking ensures each record captures a complete concept—whether that's an entire API endpoint explanation or a configuration section.

The header hierarchy (h1, h2, h3, h4) gets stored as separate fields. This lets you filter or weight results based on document structure during retrieval.

We use `uuid.uuid5` to generate deterministic IDs. This means re-running the script produces the same IDs for the same content, making updates idempotent.

---

### 9. Processing All Files

The main function orchestrates everything:

```python
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
            processed_content, document_title = preprocess_file(file_path)
            chunks = chunk_content(processed_content, file_path, document_title)
            all_chunks.extend(chunks)
            processed_files += 1
            
            if processed_files % 10 == 0:
                print(f"Processed {processed_files}/{len(all_files)} files...")
                
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
            failed_files.append((file_path, str(e)))
    
    df = pd.DataFrame(all_chunks)
    
    print("\n" + "="*60)
    print(f"Processing complete!")
    print(f"Total files processed: {processed_files}/{len(all_files)}")
    print(f"Total chunks created: {len(df)}")
    print(f"Average chunks per file: {len(df)/processed_files:.1f}")
    print("="*60 + "\n")
    
    return df
```

The function recursively finds all markdown files, processes each one, and collects chunks into a pandas DataFrame. Failed files are logged but don't crash the entire process.

---

## Loading Into Shaped

Once you have the JSONL file, loading it into Shaped is a single command:

```bash
shaped create-table-from-uri --name document_chunks --file shaped_documentation.jsonl
```

This creates a table in Shaped with your documentation chunks. From there, you can:
- Generate embeddings with Shaped's embedding models
- Build semantic search with vector similarity
- Power a RAG system that retrieves relevant chunks for LLM context

The structured format (with header hierarchy and metadata) makes it easy to implement hybrid search strategies—combining keyword matching on headers with semantic similarity on content.

---

## Edge Cases and Improvements

**Error handling:** The current implementation logs failed files but continues processing. For production use, you'd want more granular error handling—maybe retry logic for transient failures or alerting when certain critical files fail.

**Handling code samples**: We treat code samples like any other text. A more sophisticated pipeline could write every code sample as its own chunk, with some additional metadata so that an agent can search for code specifically. 

**Content deduplication:** Some documentation has repeated boilerplate (footers, common setup instructions). Fuzzy matching or semantic deduplication could reduce redundancy in the vector database.

---

## Conclusion

Building a documentation RAG system requires more than just embeddings—it requires thoughtful chunking that preserves semantic meaning while removing UI noise. By processing tabs, cleaning JSX artifacts, and chunking at header boundaries, we created a pipeline that turns messy MDX into high-quality RAG input.

The result is a Q&A bot that actually understands our documentation structure and retrieves relevant sections with context intact.