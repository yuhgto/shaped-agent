"use client"

import * as React from "react"
import { MessageSquare, Search as SearchIcon } from "lucide-react"
import { FloatingButtons } from "@/components/FloatingButtons"
import { AgentChat } from "@/components/AgentChat"
import { Search } from "@/components/Search"

type Mode = "agent" | "search"

export default function Home() {
  const [mode, setMode] = React.useState<Mode>("agent")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-x-hidden">
      {/* Background pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjI4MzEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC00djJoNHYtMnptLTYgMGgtNHYyaDR2LTJ6bTEyLTZ2LTRoLTJ2NGgyek0yNCAzNGgydi00aC0ydjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 pointer-events-none" />
      
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col h-screen">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10 flex-shrink-0 pt-6 sm:pt-12">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent mb-2 sm:mb-4 tracking-tight leading-tight">
            Shaped Bot
          </h1>
          <p className="text-slate-400 text-sm sm:text-lg max-w-md mx-auto leading-relaxed px-2">
            I can help you write content and adjust copy for specific use cases. 
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0">
          <AgentChat />
        </div>
      </main>

      <FloatingButtons />
    </div>
  )
}
