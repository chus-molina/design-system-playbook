'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  ChevronDown, ChevronRight, BookOpen, Layers, Puzzle, Layout,
  Palette, Type, Maximize, Smile, SquareMousePointer, TextCursor,
  CreditCard, X, Navigation, FormInput, Grid2X2, Users, Home,
  LogOut, User
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Logo } from './Logo'

interface NavItem {
  label: string
  href?: string
  icon?: React.ReactNode
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    label: 'Getting Started',
    icon: <Home className="w-4 h-4" />,
    href: '/',
  },
  {
    label: 'Foundations',
    icon: <Layers className="w-4 h-4" />,
    children: [
      { label: 'Colores', href: '/foundations/colors', icon: <Palette className="w-3.5 h-3.5" /> },
      { label: 'Tipografía', href: '/foundations/typography', icon: <Type className="w-3.5 h-3.5" /> },
      { label: 'Espaciado', href: '/foundations/spacing', icon: <Maximize className="w-3.5 h-3.5" /> },
      { label: 'Iconografía', href: '/foundations/icons', icon: <Smile className="w-3.5 h-3.5" /> },
    ],
  },
  {
    label: 'Components',
    icon: <Puzzle className="w-4 h-4" />,
    children: [
      { label: 'Button', href: '/components/button', icon: <SquareMousePointer className="w-3.5 h-3.5" /> },
      { label: 'Input', href: '/components/input', icon: <TextCursor className="w-3.5 h-3.5" /> },
      { label: 'Card', href: '/components/card', icon: <CreditCard className="w-3.5 h-3.5" /> },
      { label: 'Modal', href: '/components/modal', icon: <X className="w-3.5 h-3.5" /> },
      { label: 'Avatar', href: '/components/avatar', icon: <Users className="w-3.5 h-3.5" /> },
      { label: 'Tooltip', href: '/components/tooltip', icon: <BookOpen className="w-3.5 h-3.5" /> },
    ],
  },
  {
    label: 'Patterns',
    icon: <Layout className="w-4 h-4" />,
    children: [
      { label: 'Formularios', href: '/patterns/forms', icon: <FormInput className="w-3.5 h-3.5" /> },
      { label: 'Navegación', href: '/patterns/navigation', icon: <Navigation className="w-3.5 h-3.5" /> },
      { label: 'Layouts', href: '/patterns/layouts', icon: <Grid2X2 className="w-3.5 h-3.5" /> },
    ],
  },
]

function NavSection({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname()
  const isActive = item.href ? pathname === item.href : false
  const hasActive = item.children?.some(c => c.href && pathname.startsWith(c.href))
  const [open, setOpen] = useState(hasActive || depth === 0)

  if (!item.children) {
    return (
      <Link
        href={item.href!}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors',
          depth === 0 ? 'font-medium' : 'font-normal',
          isActive
            ? 'bg-accent/10 text-accent font-medium'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        )}
      >
        {item.icon}
        {item.label}
      </Link>
    )
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
          hasActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        )}
      >
        <span className="flex items-center gap-2">
          {item.icon}
          {item.label}
        </span>
        {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </button>

      {open && (
        <div className="ml-4 mt-0.5 border-l border-border pl-2 flex flex-col gap-0.5">
          {item.children.map(child => (
            <NavSection key={child.label} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

interface SidebarProps {
  isAdmin?: boolean
  user?: { email?: string } | null
}

export function Sidebar({ isAdmin, user }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <aside
      className="w-64 h-screen sticky top-0 border-r border-border flex-shrink-0 flex flex-col"
      style={{ background: 'hsl(var(--sidebar-bg))' }}
    >
      {/* Cabecera */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <Logo className="w-7 h-7" />
          <span className="text-sm font-bold text-foreground">HeroUI Playbook</span>
        </div>
      </div>

      {/* Navegación scrolleable */}
      <nav className="flex-1 min-h-0 p-3 flex flex-col gap-1 sidebar-scroll overflow-y-auto">
        {navItems.map(item => (
          <NavSection key={item.label} item={item} />
        ))}

        {isAdmin && (
          <>
            <div className="my-2 border-t border-border" />
            <Link
              href="/admin/users"
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                pathname === '/admin/users'
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <Users className="w-4 h-4" />
              Gestión de Usuarios
            </Link>
          </>
        )}
      </nav>

      {/* Bloque de usuario (parte inferior) */}
      {user && (
        <div className="relative p-3 border-t border-border flex-shrink-0">
          {menuOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-1 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-muted transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </div>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-muted transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs font-bold flex-shrink-0">
              {user.email?.[0]?.toUpperCase() ?? <User className="w-4 h-4" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground leading-tight">
                {isAdmin ? 'Administrador' : 'Usuario'}
              </p>
              <p className="text-sm text-foreground truncate leading-tight">{user.email}</p>
            </div>
            <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform flex-shrink-0', menuOpen && 'rotate-180')} />
          </button>
        </div>
      )}
    </aside>
  )
}
