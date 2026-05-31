'use client'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { FigmaLink } from './FigmaLink'

interface TocItem { id: string; label: string; level: number }

function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    items.forEach(item => {
      const el = document.getElementById(item.id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(item.id) },
        { rootMargin: '-10% 0% -70% 0%' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [items])

  if (!items.length) return null

  return (
    <nav className="space-y-0.5">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">En esta página</p>
      {items.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            'block py-1 text-sm transition-colors border-l-2 pl-3',
            item.level === 3 ? 'pl-5 text-xs' : '',
            active === item.id
              ? 'border-accent text-accent font-medium'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}

interface DocPageProps {
  title: string
  description: string
  figmaUrl?: string | null
  toc: TocItem[]
  children: React.ReactNode
}

export function DocPage({ title, description, figmaUrl, toc, children }: DocPageProps) {
  return (
    <div className="flex gap-16 w-full">
      <div className="flex-1 min-w-0 max-w-3xl">
        <div className="flex items-start justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            <p className="mt-2 text-muted-foreground text-base leading-relaxed">{description}</p>
          </div>
          {figmaUrl && <div className="flex-shrink-0 mt-1"><FigmaLink url={figmaUrl} /></div>}
        </div>
        <div className="space-y-1">{children}</div>
      </div>

      {toc.length > 0 && (
        <aside className="hidden xl:block w-52 flex-shrink-0">
          <div className="sticky top-24">
            <TableOfContents items={toc} />
          </div>
        </aside>
      )}
    </div>
  )
}

export function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-xl font-bold text-foreground mt-12 mb-4 scroll-mt-24 pb-2 border-b border-border first:mt-0">
      {children}
    </h2>
  )
}

export function SubTitle({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="text-base font-semibold text-foreground mt-6 mb-3 scroll-mt-24">
      {children}
    </h3>
  )
}

export function DocText({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground leading-relaxed my-3">{children}</p>
}

export function CodeInline({ children }: { children: React.ReactNode }) {
  return <code className="text-accent bg-muted px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
}
