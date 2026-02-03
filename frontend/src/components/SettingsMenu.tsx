"use client"

import { Settings, Sun, Moon, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/providers/ThemeProvider"

const SHAPED_ABOUT_URL = "https://www.shaped.ai"

export function SettingsMenu() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            aria-label="Open settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <a
              href={SHAPED_ABOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Info className="h-4 w-4" />
              About
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleTheme} className="flex items-center gap-2">
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            Switch theme
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
