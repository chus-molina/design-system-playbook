'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  label: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    items.forEach(item => {
      const el = document.getElementById(item.id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(item.id) },
        { rootMargin: '-20% 0% -70% 0%' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="space-y-1">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
        En esta página
      </p>
      {items.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            'block text-sm py-1 transition-colors border-l-2 pl-3',
            item.level === 3 ? 'pl-6 text-xs' : '',
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
