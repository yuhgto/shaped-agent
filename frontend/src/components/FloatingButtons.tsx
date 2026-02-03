"use client"

import Image from "next/image";
import { useTheme } from "@/providers/ThemeProvider";
import { PoweredByBadge } from "./PoweredByBadge";

const GitHubButton = () => {
  const { theme } = useTheme();

  return (
    <a
      href="https://github.com/yuhgto/shaped-demos/document-search"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-muted hover:bg-muted/80 active:bg-muted/70 border border-border rounded-lg transition-colors touch-manipulation"
    >
      <Image
        src={theme === "dark" ? "/github-mark-white.svg" : "/github-mark-black.png"}
        alt="GitHub"
        width={20}
        height={20}
        className="h-5 w-5"
      />
    </a>
  );
};

export const FloatingButtons = () => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:bottom-6 sm:right-6 flex flex-row items-center gap-2 sm:gap-3 z-50">
      <GitHubButton />
      <PoweredByBadge />
    </div>
  );
};

