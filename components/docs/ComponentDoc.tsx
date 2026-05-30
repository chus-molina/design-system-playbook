'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface ComponentDocProps {
  name: string
  description: string
  tabs: Tab[]
  figmaLink?: React.ReactNode
}

export function ComponentDoc({ name, description, tabs, figmaLink }: ComponentDocProps) {
  const [active, setActive] = useState(tabs[0]?.id)

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{name}</h1>
            <p className="mt-2 text-muted-foreground text-lg">{description}</p>
          </div>
          {figmaLink && <div className="flex-shrink-0 mt-1">{figmaLink}</div>}
        </div>
      </div>

      <div className="border-b border-border">
        <div className="flex gap-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors',
                active === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        {tabs.find(t => t.id === active)?.content}
      </div>
    </div>
  )
}
