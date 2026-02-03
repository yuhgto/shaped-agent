"use client"

import * as React from "react"
import { Copy, Check } from "lucide-react"
import hljs from "highlight.js/lib/core"

// Import common languages
import javascript from "highlight.js/lib/languages/javascript"
import typescript from "highlight.js/lib/languages/typescript"
import python from "highlight.js/lib/languages/python"
import yaml from "highlight.js/lib/languages/yaml"
import json from "highlight.js/lib/languages/json"
import bash from "highlight.js/lib/languages/bash"
import css from "highlight.js/lib/languages/css"
import xml from "highlight.js/lib/languages/xml" // for HTML
import sql from "highlight.js/lib/languages/sql"
import java from "highlight.js/lib/languages/java"
import csharp from "highlight.js/lib/languages/csharp"
import go from "highlight.js/lib/languages/go"
import rust from "highlight.js/lib/languages/rust"
import markdown from "highlight.js/lib/languages/markdown"

// Import highlight.js theme
import "highlight.js/styles/atom-one-dark.css"

// Register languages
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("python", python)
hljs.registerLanguage("yaml", yaml)
hljs.registerLanguage("json", json)
hljs.registerLanguage("bash", bash)
hljs.registerLanguage("sh", bash)
hljs.registerLanguage("shell", bash)
hljs.registerLanguage("css", css)
hljs.registerLanguage("html", xml)
hljs.registerLanguage("xml", xml)
hljs.registerLanguage("sql", sql)
hljs.registerLanguage("java", java)
hljs.registerLanguage("csharp", csharp)
hljs.registerLanguage("cs", csharp)
hljs.registerLanguage("go", go)
hljs.registerLanguage("rust", rust)
hljs.registerLanguage("markdown", markdown)
hljs.registerLanguage("md", markdown)
hljs.registerLanguage("js", javascript)
hljs.registerLanguage("ts", typescript)
hljs.registerLanguage("yml", yaml)

interface CodeBlockProps {
  language: string
  code: string
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const [highlightedCode, setHighlightedCode] = React.useState<string | null>(null)

  // Debounced syntax highlighting to avoid flashing during streaming
  React.useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Normalize language names
        const normalizedLang = language.toLowerCase().trim()
        
        // Try to highlight with specified language first
        if (normalizedLang && hljs.getLanguage(normalizedLang)) {
          const result = hljs.highlight(code, { language: normalizedLang })
          setHighlightedCode(result.value)
        } else {
          // Fallback to auto-detection
          const result = hljs.highlightAuto(code)
          setHighlightedCode(result.value)
        }
      } catch (err) {
        // If highlighting fails, fallback to plain text
        console.error("Syntax highlighting error:", err)
        setHighlightedCode(null)
      }
    }, 200) // 200ms debounce for streaming

    return () => clearTimeout(timer)
  }, [code, language])

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(err => {
      console.error("Failed to copy code:", err)
    })
  }, [code])

  return (
    <div className="relative group my-3">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
        aria-label={copied ? "Copied!" : "Copy code"}
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>

      {/* Code block */}
      <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-hidden border border-zinc-800">
        {highlightedCode ? (
          <code
            className="font-mono text-xs sm:text-sm whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : (
          <code className="font-mono text-xs sm:text-sm whitespace-pre-wrap break-words">
            {code}
          </code>
        )}
      </pre>
    </div>
  )
}
