'use client'
import { ThemeToggle } from './ThemeToggle'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  user: { email?: string; user_metadata?: { full_name?: string } } | null
  isAdmin?: boolean
}

export function Header({ user, isAdmin }: HeaderProps) {
  const router = useRouter()
  const supabase = createClient()
  const [open, setOpen] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

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

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors text-sm text-foreground"
          >
            <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs font-bold">
              {user?.email?.[0]?.toUpperCase() ?? <User className="w-3 h-3" />}
            </div>
            <span className="hidden sm:block max-w-[160px] truncate text-muted-foreground">
              {user?.email}
            </span>
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-1 w-56 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
              <div className="px-3 py-2 border-b border-border">
                <p className="text-xs text-muted-foreground">Conectado como</p>
                <p className="text-sm font-medium text-foreground truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-muted transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
