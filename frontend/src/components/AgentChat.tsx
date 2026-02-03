"use client"

import * as React from "react"
import { Send, Loader2, User, ArrowDown, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/CodeBlock"
import Image from "next/image"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

type MessageType = 
  | { type: "user"; content: string }
  | { type: "assistant"; content: string }
  | { type: "tool_call"; toolName: string; toolArgs: any }
  | { type: "tool_result"; toolName: string; content: string; status: string }

interface ChatMessage {
  id: string
  message: MessageType
}

export interface AgentChatHandle {
  submitQuery: (query: string) => void
}

interface AgentChatProps {
  onEmptyStateChange?: (isEmpty: boolean) => void
}

export const AgentChat = React.forwardRef<AgentChatHandle, AgentChatProps>(function AgentChat({ onEmptyStateChange }, ref) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = React.useState(false)

  // Focus input on mount
  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Track scroll position
  const handleScroll = React.useCallback(() => {
    if (!scrollContainerRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
    setShowScrollButton(!isNearBottom)
  }, [])

  React.useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return
    
    // Check initial scroll position
    handleScroll()
    
    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Check scroll position when messages change
  React.useEffect(() => {
    handleScroll()
  }, [messages, handleScroll])

  const scrollToBottom = React.useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const submitMessage = React.useCallback(async (messageText: string) => {
    if (!messageText.trim() || isLoading) return

    const userMessage = messageText.trim()
    setInput("")
    
    // Add user message immediately
    const userMessageId = `user-${Date.now()}`
    const newUserMessage: ChatMessage = { 
      id: userMessageId,
      message: { type: "user", content: userMessage }
    }
    setMessages((prev) => [...prev, newUserMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      if (!response.body) {
        throw new Error("Response body is null")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ""
      let accumulatedContent = ""
      let currentAssistantMessageId: string | null = null
      let currentToolCallId: string | null = null
      let accumulatedToolArgs = ""

      // Helper function to identify message type from token
      const getMessageType = (token: any): { type: string; data?: any } => {
        const messageId = token.id || []
        
        // Check if it's a ToolMessage
        if (Array.isArray(messageId) && messageId[2] === "ToolMessage") {
          const toolName = token.kwargs?.name || ""
          const content = token.kwargs?.content || ""
          const status = token.kwargs?.status || "unknown"
          return { 
            type: "tool_result", 
            data: { toolName, content, status }
          }
        }
        
        // Check if it's an AIMessageChunk
        if (Array.isArray(messageId) && messageId[2] === "AIMessageChunk") {
          const content = token.kwargs?.content || []
          
          // Check if it contains a tool_use
          if (Array.isArray(content)) {
            const toolUse = content.find((block: any) => block.type === "tool_use")
            if (toolUse) {
              return {
                type: "tool_call",
                data: {
                  toolName: toolUse.name || "",
                  toolArgs: toolUse.input || ""
                }
              }
            }
            
            // Check for input_json_delta (streaming tool args)
            const inputDelta = content.find((block: any) => block.type === "input_json_delta")
            if (inputDelta) {
              return {
                type: "tool_call_delta",
                data: {
                  input: inputDelta.input || ""
                }
              }
            }
          }
          
          // It's a regular assistant message with text
          return { type: "assistant" }
        }
        
        return { type: "unknown" }
      }

      // Helper function to extract text content from token
      const extractTextContent = (token: any): string => {
        // LangChain AIMessageChunk structure: token.kwargs.content is an array
        if (token.kwargs && token.kwargs.content) {
          const content = token.kwargs.content
          if (Array.isArray(content)) {
            return content
              .filter((block: any) => block.type === "text")
              .map((block: any) => block.text || "")
              .join("")
          }
          if (typeof content === "string") {
            return content
          }
        }
        
        // Fallback: check for contentBlocks (alternative format)
        if (token.contentBlocks && Array.isArray(token.contentBlocks)) {
          return token.contentBlocks
            .filter((block: any) => block.type === "text")
            .map((block: any) => block.text || "")
            .join("")
        }
        
        // Fallback: check for direct content property
        if (token.content) {
          if (typeof token.content === "string") {
            return token.content
          }
          if (Array.isArray(token.content)) {
            return token.content
              .filter((block: any) => block.type === "text")
              .map((block: any) => block.text || "")
              .join("")
          }
        }
        
        // Last resort: return empty string to avoid [Object object]
        return ""
      }

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) {
          break
        }

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n\n")
        buffer = lines.pop() || "" // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6))
              
              if (data.type === "token") {
                const messageType = getMessageType(data.token)
                
                if (messageType.type === "tool_call") {
                  // Remove empty assistant message if one exists (tool call interrupts it)
                  if (currentAssistantMessageId) {
                    setMessages((prev) => {
                      const newMessages = prev.filter(m => m.id !== currentAssistantMessageId)
                      return newMessages
                    })
                    currentAssistantMessageId = null
                    accumulatedContent = ""
                  }
                  
                  // Start a new tool call
                  const toolCallId = `tool-call-${Date.now()}`
                  currentToolCallId = toolCallId
                  accumulatedToolArgs = messageType.data.toolArgs || ""
                  
                  setMessages((prev) => [...prev, {
                    id: toolCallId,
                    message: {
                      type: "tool_call",
                      toolName: messageType.data.toolName,
                      toolArgs: accumulatedToolArgs
                    }
                  }])
                } else if (messageType.type === "tool_call_delta") {
                  // Accumulate tool call args as they stream in
                  accumulatedToolArgs += messageType.data.input || ""
                  
                  if (currentToolCallId) {
                    const toolCallId = currentToolCallId
                    setMessages((prev) => {
                      const newMessages = [...prev]
                      const toolCallIndex = newMessages.findIndex(
                        m => m.id === toolCallId
                      )
                      if (toolCallIndex !== -1) {
                        newMessages[toolCallIndex] = {
                          id: toolCallId,
                          message: {
                            type: "tool_call",
                            toolName: (newMessages[toolCallIndex].message as any).toolName,
                            toolArgs: accumulatedToolArgs
                          }
                        }
                      }
                      return newMessages
                    })
                  }
                } else if (messageType.type === "tool_result") {
                  currentToolCallId = null
                  accumulatedToolArgs = ""
                  
                  // Add tool result message
                  const toolResultId = `tool-result-${Date.now()}`
                  setMessages((prev) => [...prev, {
                    id: toolResultId,
                    message: {
                      type: "tool_result",
                      toolName: messageType.data.toolName,
                      content: messageType.data.content,
                      status: messageType.data.status
                    }
                  }])
                  
                  // After tool result, start a new assistant message for the next response
                  // (don't create it yet, wait for the first token)
                  currentAssistantMessageId = null
                  accumulatedContent = ""
                } else if (messageType.type === "assistant") {
                  // Handle assistant text message
                  if (!currentAssistantMessageId) {
                    currentAssistantMessageId = `assistant-${Date.now()}`
                    accumulatedContent = ""
                    setMessages((prev) => [...prev, {
                      id: currentAssistantMessageId!,
                      message: { type: "assistant", content: "" }
                    }])
                  }
                  
                  const tokenContent = extractTextContent(data.token)
                  accumulatedContent += tokenContent
                  
                  // Update the assistant message with accumulated content
                  if (currentAssistantMessageId) {
                    const assistantId = currentAssistantMessageId
                    setMessages((prev) => {
                      const newMessages = [...prev]
                      const assistantIndex = newMessages.findIndex(
                        m => m.id === assistantId
                      )
                      if (assistantIndex !== -1) {
                        newMessages[assistantIndex] = {
                          id: assistantId,
                          message: {
                            type: "assistant",
                            content: accumulatedContent
                          }
                        }
                      }
                      return newMessages
                    })
                  }
                }
              } else if (data.type === "done") {
                currentAssistantMessageId = null
                accumulatedContent = ""
                setIsLoading(false)
                break
              } else if (data.type === "error") {
                throw new Error(data.error || "Unknown error")
              }
            } catch (parseError) {
              console.error("Error parsing SSE data:", parseError)
            }
          }
        }
      }

      // Ensure loading is set to false
      setIsLoading(false)
    } catch (error) {
      console.error("Error sending message:", error)
      setIsLoading(false)
      
      // Add error message
      setMessages((prev) => [...prev, {
        id: `error-${Date.now()}`,
        message: {
          type: "assistant",
          content: "Sorry, I encountered an error. Please try again."
        }
      }])
    }
  }, [isLoading])

  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault()
    submitMessage(input)
  }, [input, submitMessage])

  React.useImperativeHandle(ref, () => ({
    submitQuery: (query: string) => {
      setInput(query)
      // Use setTimeout to ensure state is updated before submitting
      setTimeout(() => submitMessage(query), 0)
    }
  }), [submitMessage])

  const isEmpty = messages.length === 0 && !isLoading

  React.useEffect(() => {
    onEmptyStateChange?.(isEmpty)
  }, [isEmpty, onEmptyStateChange])

  return (
    <div className="flex flex-col h-full">
      {/* Messages container - flex-1, scrollable */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto space-y-4 sm:space-y-6 pt-4 sm:pt-6 mb-4 pr-2 min-h-0">
        {messages
          .filter((msg) => {
            // Filter out empty assistant messages
            if (msg.message.type === "assistant" && !msg.message.content.trim()) {
              return false
            }
            return true
          })
          .map((msg) => {
          const { id, message } = msg
          
          // Render user message
          if (message.type === "user") {
            return (
              <div key={id} className="flex gap-3 sm:gap-4 justify-end">
                <div className="max-w-[85%] sm:max-w-[75%] rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-muted dark:bg-primary/20 text-foreground">
                  <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                </div>
              </div>
            )
          }
          
          // Render assistant message
          if (message.type === "assistant") {
            return (
              <div key={id} className="flex gap-3 sm:gap-4 justify-start">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                  <Image 
                    src="/creepy_allen-removebg-preview.png" 
                    alt="Allen" 
                    width={40} 
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="max-w-[85%] sm:max-w-[75%] rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-muted/50 text-foreground">
                  <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                    {(() => {
                      const lines = message.content.split('\n')
                      const elements: React.ReactElement[] = []
                      let i = 0
                      
                      while (i < lines.length) {
                        const line = lines[i]
                        
                        // Handle code blocks (triple backticks)
                        if (line.startsWith('```')) {
                          const language = line.substring(3).trim()
                          const codeLines: string[] = []
                          i++
                          
                          // Collect all lines until closing ```
                          while (i < lines.length && !lines[i].startsWith('```')) {
                            codeLines.push(lines[i])
                            i++
                          }
                          
                          elements.push(
                            <CodeBlock
                              key={elements.length}
                              language={language}
                              code={codeLines.join('\n')}
                            />
                          )
                          i++ // Skip closing ```
                          continue
                        }
                        
                        // Handle markdown headers
                        if (line.startsWith('### ')) {
                          elements.push(
                            <h3 key={elements.length} className="text-lg font-semibold mt-4 mb-2 text-foreground">
                              {line.substring(4)}
                            </h3>
                          )
                          i++
                          continue
                        }
                        if (line.startsWith('## ')) {
                          elements.push(
                            <h2 key={elements.length} className="text-xl font-semibold mt-4 mb-2 text-foreground">
                              {line.substring(3)}
                            </h2>
                          )
                          i++
                          continue
                        }
                        if (line.startsWith('# ')) {
                          elements.push(
                            <h1 key={elements.length} className="text-2xl font-bold mt-4 mb-2 text-foreground">
                              {line.substring(2)}
                            </h1>
                          )
                          i++
                          continue
                        }
                        
                        // Handle regular text with bold and inline code
                        const parts = line.split(/(\*\*.*?\*\*)/g)
                        elements.push(
                          <p key={elements.length} className={i < lines.length - 1 ? "mb-2" : ""}>
                            {parts.map((part, j) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={j} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>
                              }
                              // Handle inline code
                              const codeParts = part.split(/(`[^`]+`)/g)
                              return (
                                <React.Fragment key={j}>
                                  {codeParts.map((codePart, k) => {
                                    if (codePart.startsWith('`') && codePart.endsWith('`')) {
                                      return (
                                        <code key={k} className="bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">
                                          {codePart.slice(1, -1)}
                                        </code>
                                      )
                                    }
                                    return <span key={k}>{codePart}</span>
                                  })}
                                </React.Fragment>
                              )
                            })}
                          </p>
                        )
                        i++
                      }
                      
                      return elements
                    })()}
                  </div>
                </div>
              </div>
            )
          }
          
          // Render tool call
          if (message.type === "tool_call") {
            const isSearch = message.toolName === "search_documents"
            const isReadWebpage = message.toolName === "read_webpage"
            
            // Try to parse tool args (they might be a JSON string or object)
            let parsedArgs: any = null
            if (typeof message.toolArgs === "string" && message.toolArgs.trim()) {
              try {
                parsedArgs = JSON.parse(message.toolArgs)
              } catch (e) {
                // Not valid JSON yet (might be streaming), use as-is
                parsedArgs = message.toolArgs
              }
            } else if (message.toolArgs && typeof message.toolArgs === "object") {
              parsedArgs = message.toolArgs
            }
            
            const headerLabel = isSearch ? "Searching documents" : isReadWebpage ? "Reading webpage" : `Calling ${message.toolName}`
            return (
              <div key={id} className="flex gap-3 sm:gap-4 justify-start">
                <Collapsible className="max-w-[85%] sm:max-w-[75%]">
                  <div className="text-sm sm:text-base text-muted-foreground">
                    <CollapsibleTrigger className="flex items-center gap-2 group data-[state=open]:mb-2">
                      <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-data-[state=closed]:rotate-[-90deg]" />
                      <span className="font-semibold text-foreground">{headerLabel}</span>
                    </CollapsibleTrigger>
                    {parsedArgs && (
                      <CollapsibleContent>
                        <div className="text-xs text-muted-foreground mt-2 pl-6">
                          {typeof parsedArgs === "string" ? (
                            <span className="font-mono">{parsedArgs}</span>
                          ) : (
                            <pre className="whitespace-pre-wrap font-mono">
                              {JSON.stringify(parsedArgs, null, 2)}
                            </pre>
                          )}
                        </div>
                      </CollapsibleContent>
                    )}
                  </div>
                </Collapsible>
              </div>
            )
          }
          
          // Render tool result
          if (message.type === "tool_result") {
            const isSearch = message.toolName === "search_documents"
            const isReadWebpage = message.toolName === "read_webpage"
            
            // Try to parse search results if it's a search tool
            let parsedResults = null
            if (isSearch) {
              try {
                parsedResults = JSON.parse(message.content)
              } catch (e) {
                // Not JSON, that's okay
              }
            }
            
            const headerLabel = isSearch ? "Search results" : isReadWebpage ? "Webpage content" : `${message.toolName} result`
            return (
              <div key={id} className="flex gap-3 sm:gap-4 justify-start">
                <Collapsible defaultOpen={false} className="max-w-[85%] sm:max-w-[75%]">
                  <div className="text-sm sm:text-base text-muted-foreground">
                    <CollapsibleTrigger className="flex items-center gap-2 group data-[state=open]:mb-2">
                      <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-data-[state=open]:rotate-90" />
                      <span className="font-semibold text-foreground">{headerLabel}</span>
                      {message.status && (
                        <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          {message.status}
                        </span>
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {(parsedResults && Array.isArray(parsedResults)) ? (
                        <div className="space-y-2 mt-2 pl-6">
                          {parsedResults.map((result: any, idx: number) => (
                            <div key={idx} className="text-xs bg-muted p-2 rounded">
                              <div className="font-semibold text-foreground mb-1">{result.title}</div>
                              <div className="text-muted-foreground line-clamp-2">{result.content}</div>
                              {result.url && (
                                <a 
                                  href={result.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline text-xs mt-1 block truncate"
                                >
                                  {result.url}
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground mt-2 pl-6 max-h-32 overflow-y-auto">
                          {message.content.length > 200 ? `${message.content.substring(0, 200)}...` : message.content}
                        </div>
                      )}
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              </div>
            )
          }
          
          return null
        })}

        {isLoading && (
          <div className="flex gap-3 sm:gap-4 justify-start">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
              <Image 
                src="/creepy_allen-removebg-preview.png" 
                alt="Allen" 
                width={40} 
                height={40}
                className="object-cover"
              />
            </div>
            <div className="bg-muted/50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
              <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input form - always at bottom */}
      <form onSubmit={handleSubmit} className="flex-shrink-0 pb-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
              className="w-full h-12 sm:h-14 pl-4 sm:pl-5 pr-14 sm:pr-16 bg-muted/50 border border-border rounded-xl sm:rounded-2xl text-base sm:text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 disabled:opacity-50"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              size="icon"
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
              ) : (
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
          </div>
        </form>

      {/* Floating scroll to bottom button */}
      <button
        onClick={scrollToBottom}
        className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none ${
          showScrollButton ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to bottom"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </div>
  )
})

