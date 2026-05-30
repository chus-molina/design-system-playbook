'use client'
import { useState } from 'react'
import { Moon, Sun, Code2, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PreviewProps {
  children: React.ReactNode
  code?: string
  className?: string
}

export function Preview({ children, code, className }: PreviewProps) {
  const [dark, setDark] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden my-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
        <span className="text-xs text-muted-foreground font-medium">Preview</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setDark(!dark)}
            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title={dark ? 'Modo claro' : 'Modo oscuro'}
          >
            {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          {code && (
            <button
              onClick={() => setShowCode(!showCode)}
              className={cn(
                'p-1.5 rounded-md transition-colors text-muted-foreground hover:text-foreground',
                showCode ? 'bg-accent/10 text-accent' : 'hover:bg-muted'
              )}
              title="Ver código"
            >
              <Code2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Component preview */}
      <div
        className={cn(
          'flex flex-wrap items-center justify-center gap-4 p-10 min-h-[140px] transition-colors',
          dark ? 'bg-zinc-950' : 'bg-white',
          className
        )}
      >
        {children}
      </div>

      {/* Code block */}
      {showCode && code && (
        <div className="relative border-t border-border">
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors z-10"
          >
            {copied
              ? <Check className="w-3.5 h-3.5 text-green-400" />
              : <Copy className="w-3.5 h-3.5 text-gray-400" />
            }
          </button>
          <pre className="p-4 overflow-x-auto text-sm font-mono" style={{ background: 'hsl(222 47% 6%)', color: 'hsl(210 40% 98%)' }}>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
