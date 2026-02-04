"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/providers/ThemeProvider"
import { FloatingButtons } from "@/components/FloatingButtons"
import { SettingsMenu } from "@/components/SettingsMenu"
import { AgentChat, type AgentChatHandle } from "@/components/AgentChat"

const SAMPLE_QUERIES = [
  "Does Shaped support the Two-Tower scoring model?",
  "Write me an engine config for a basic semantic search model",
]

export default function Home() {
  const chatRef = React.useRef<AgentChatHandle>(null)
  const [isEmpty, setIsEmpty] = React.useState(true)
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col h-screen">
        {/* Header - animates between centered and top-left positions */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={isEmpty ? "flex-1 flex flex-col min-h-0" : "flex-shrink-0"}
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={
              isEmpty
                ? "flex flex-col justify-center items-center mb-6 sm:mb-10 pt-6 sm:pt-12"
                : "relative flex flex-row items-center gap-4 sm:gap-6 pt-4 sm:pt-6 pb-4 sm:pb-6"
            }
          >
            {!isEmpty && (
              <div
                className="absolute left-1/2 -translate-x-1/2 w-screen bottom-0 h-px bg-border pointer-events-none"
                aria-hidden
              />
            )}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`rounded-full overflow-hidden border-2 border-border flex-shrink-0 ${
                isEmpty ? "w-16 h-16 sm:w-20 sm:h-20 mb-4" : "w-12 h-12 sm:w-14 sm:h-14"
              }`}
            >
              <Image
                src={theme === "dark" ? "/creepy_allen-removebg-preview.png" : "/allen_light_mode_happy.png"}
                alt="Allen"
                width={80}
                height={80}
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`flex flex-col ${isEmpty ? "text-center items-center" : "min-w-0"}`}
            >
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
                Ask Al
              </h1>
              <h2 className="text-foreground text-sm sm:text-lg leading-relaxed mt-1">
                Ask Allen (Al) anything
              </h2>
            </motion.div>
          </motion.div>
          <AnimatePresence>
            {isEmpty && (
              <motion.div
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 overflow-hidden"
              >
                {SAMPLE_QUERIES.map((query) => (
                  <button
                    key={query}
                    type="button"
                    onClick={() => chatRef.current?.submitQuery(query)}
                    className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 border border-border text-foreground text-sm sm:text-base transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Content */}
        <div className={isEmpty ? "flex-shrink-0" : "flex-1 min-h-0"}>
          <AgentChat ref={chatRef} onEmptyStateChange={setIsEmpty} />
        </div>
      </main>

      <FloatingButtons />
      <SettingsMenu />
    </div>
  )
}
