"use client"

import Image from "next/image"
import { useTheme } from "@/providers/ThemeProvider"

export const PoweredByBadge: React.FC = () => {
  const { theme } = useTheme()

  return (
    <div className="z-50 bg-transparent sm:bg-background sm:border sm:border-border rounded-lg px-0 py-0 sm:px-3 sm:py-2 sm:animate-glow">
      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(147, 51, 234, 0.3), 0 0 10px rgba(147, 51, 234, 0.2), 0 0 20px rgba(147, 51, 234, 0.1);
          }
          50% {
            box-shadow: 0 0 10px rgba(147, 51, 234, 0.5), 0 0 20px rgba(147, 51, 234, 0.3), 0 0 30px rgba(147, 51, 234, 0.2);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
      <a 
        href="https://shaped.ai/agent-retrieval" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-foreground hover:text-muted-foreground active:text-muted-foreground transition-colors touch-manipulation"
      >
        <span className="hidden sm:inline">Powered by</span>
        <Image 
          src={theme === "dark" ? "/Shaped_Logo_Horizontal_White@3x (1).png" : "https://docs.shaped.ai/img/shaped-icon.svg"}
          alt="Shaped"
          width={theme === "dark" ? 80 : 20}
          height={theme === "dark" ? 24 : 20}
          className="h-5 w-auto"
        />
      </a>
    </div>
  );
};

