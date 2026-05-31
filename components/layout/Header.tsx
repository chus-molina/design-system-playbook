'use client'
import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  user?: { email?: string } | null
  isAdmin?: boolean
}

export function Header({ isAdmin }: HeaderProps) {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-foreground">Design System Playbook</span>
        {isAdmin && (
          <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-medium">
            Admin
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  )
}
