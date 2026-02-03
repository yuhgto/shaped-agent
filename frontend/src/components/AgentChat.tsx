"use client"

import * as React from "react"
import { Send, Loader2, User, Bot, Search, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

type MessageType = 
  | { type: "user"; content: string }
  | { type: "assistant"; content: string }
  | { type: "tool_call"; toolName: string; toolArgs: any }
  | { type: "tool_result"; toolName: string; content: string; status: string }

interface ChatMessage {
  id: string
  message: MessageType
}

export function AgentChat() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input on mount
  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
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
  }

  const isEmpty = messages.length === 0 && !isLoading

  return (
    <div className="flex flex-col h-full">
      {/* Input form - shown at top when empty, at bottom when messages exist */}
      {isEmpty && (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
              className="w-full h-12 sm:h-14 pl-4 sm:pl-5 pr-14 sm:pr-16 bg-slate-900/90 border border-slate-700/50 rounded-xl sm:rounded-2xl text-base sm:text-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-xl transition-all duration-300 shadow-xl shadow-black/20 disabled:opacity-50"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              size="icon"
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
              ) : (
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
          </div>
        </form>
      )}

      {/* Messages container */}
      <div className={`${isEmpty ? 'hidden' : 'flex-1 overflow-y-auto space-y-4 sm:space-y-6 mb-4 pr-2 min-h-0'}`}>
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
                <div className="max-w-[85%] sm:max-w-[75%] rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-cyan-500/20 text-slate-100">
                  <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-700/50 flex items-center justify-center">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                </div>
              </div>
            )
          }
          
          // Render assistant message
          if (message.type === "assistant") {
            return (
              <div key={id} className="flex gap-3 sm:gap-4 justify-start">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                </div>
                <div className="max-w-[85%] sm:max-w-[75%] rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-slate-900/60 border border-slate-700/40 text-slate-200">
                  <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                    {message.content.split('\n').map((line, i, arr) => {
                      // Handle markdown headers
                      if (line.startsWith('### ')) {
                        return <h3 key={i} className="text-lg font-semibold mt-4 mb-2 text-slate-100">{line.substring(4)}</h3>
                      }
                      if (line.startsWith('## ')) {
                        return <h2 key={i} className="text-xl font-semibold mt-4 mb-2 text-slate-100">{line.substring(3)}</h2>
                      }
                      if (line.startsWith('# ')) {
                        return <h1 key={i} className="text-2xl font-bold mt-4 mb-2 text-slate-100">{line.substring(2)}</h1>
                      }
                      // Handle bold text
                      const parts = line.split(/(\*\*.*?\*\*)/g)
                      return (
                        <p key={i} className={i < arr.length - 1 ? "mb-2" : ""}>
                          {parts.map((part, j) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={j} className="text-slate-100 font-semibold">{part.slice(2, -2)}</strong>
                            }
                            // Handle inline code
                            const codeParts = part.split(/(`[^`]+`)/g)
                            return (
                              <React.Fragment key={j}>
                                {codeParts.map((codePart, k) => {
                                  if (codePart.startsWith('`') && codePart.endsWith('`')) {
                                    return (
                                      <code key={k} className="bg-slate-800/50 px-1.5 py-0.5 rounded text-cyan-400 text-xs">
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
                    })}
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
            
            return (
              <div key={id} className="flex gap-3 sm:gap-4 justify-start">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  {isSearch ? (
                    <Search className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
                  ) : isReadWebpage ? (
                    <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
                  ) : (
                    <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
                  )}
                </div>
                <div className="max-w-[85%] sm:max-w-[75%] rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-amber-500/10 border border-amber-500/30 text-slate-300">
                  <div className="text-sm sm:text-base">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-amber-400">
                        {isSearch ? "Searching documents" : isReadWebpage ? "Reading webpage" : `Calling ${message.toolName}`}
                      </span>
                    </div>
                    {parsedArgs && (
                      <div className="text-xs text-slate-400 mt-2">
                        {typeof parsedArgs === "string" ? (
                          <span className="font-mono">{parsedArgs}</span>
                        ) : (
                          <pre className="whitespace-pre-wrap font-mono">
                            {JSON.stringify(parsedArgs, null, 2)}
                          </pre>
                        )}
                      </div>
                    )}
                  </div>
                </div>
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
            
            return (
              <div key={id} className="flex gap-3 sm:gap-4 justify-start">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  {isSearch ? (
                    <Search className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                  ) : isReadWebpage ? (
                    <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                  ) : (
                    <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                  )}
                </div>
                <div className="max-w-[85%] sm:max-w-[75%] rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-emerald-500/10 border border-emerald-500/30 text-slate-300">
                  <div className="text-sm sm:text-base">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-emerald-400">
                        {isSearch ? "Search results" : isReadWebpage ? "Webpage content" : `${message.toolName} result`}
                      </span>
                      {message.status && (
                        <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                          {message.status}
                        </span>
                      )}
                    </div>
                    {parsedResults && Array.isArray(parsedResults) ? (
                      <div className="space-y-2 mt-2">
                        {parsedResults.map((result: any, idx: number) => (
                          <div key={idx} className="text-xs bg-slate-800/50 p-2 rounded">
                            <div className="font-semibold text-slate-200 mb-1">{result.title}</div>
                            <div className="text-slate-400 line-clamp-2">{result.content}</div>
                            {result.url && (
                              <a 
                                href={result.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:text-cyan-300 text-xs mt-1 block truncate"
                              >
                                {result.url}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 mt-2 max-h-32 overflow-y-auto">
                        {message.content.length > 200 ? `${message.content.substring(0, 200)}...` : message.content}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          }
          
          return null
        })}

        {isLoading && (
          <div className="flex gap-3 sm:gap-4 justify-start">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
            </div>
            <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl sm:rounded-2xl p-3 sm:p-4">
              <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input form - shown at bottom when messages exist */}
      {!isEmpty && (
        <form onSubmit={handleSubmit} className="flex-shrink-0 pb-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
              className="w-full h-12 sm:h-14 pl-4 sm:pl-5 pr-14 sm:pr-16 bg-slate-900/90 border border-slate-700/50 rounded-xl sm:rounded-2xl text-base sm:text-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-xl transition-all duration-300 shadow-xl shadow-black/20 disabled:opacity-50"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              size="icon"
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
              ) : (
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

