import { Preview } from '@/components/docs/Preview'
import { DoDont, Do, Dont } from '@/components/docs/DoDont'
import { PropsTable } from '@/components/docs/PropsTable'
import { Callout } from '@/components/docs/Callout'
import { UsageRule } from '@/components/docs/UsageRule'
import type { MDXComponents } from 'mdx/types'

// UI components for use inside MDX
// These are the actual components from the design system

function Btn({
  variant = 'primary',
  size = 'md',
  children,
  disabled,
  loading,
}: {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  disabled?: boolean
  loading?: boolean
}) {
  const variants = {
    primary: 'bg-[hsl(221,83%,53%)] text-white hover:bg-[hsl(221,83%,48%)]',
    secondary: 'bg-[hsl(210,40%,96%)] text-[hsl(222,84%,5%)] hover:bg-[hsl(210,40%,90%)] dark:bg-zinc-800 dark:text-white',
    outline: 'border border-[hsl(214,32%,91%)] bg-transparent text-[hsl(222,84%,5%)] hover:bg-[hsl(210,40%,96%)] dark:border-zinc-700 dark:text-white',
    ghost: 'bg-transparent text-[hsl(222,84%,5%)] hover:bg-[hsl(210,40%,96%)] dark:text-white dark:hover:bg-zinc-800',
    destructive: 'bg-[hsl(0,84%,60%)] text-white hover:bg-[hsl(0,84%,55%)]',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-xl',
  }
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center gap-2 font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]}`}
    >
      {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  )
}

function Heading2({ children, id }: { children: React.ReactNode; id?: string }) {
  const slug = id ?? String(children).toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
  return (
    <h2 id={slug} className="text-xl font-bold text-foreground mt-10 mb-4 scroll-mt-24 border-b border-border pb-2">
      {children}
    </h2>
  )
}

function Heading3({ children, id }: { children: React.ReactNode; id?: string }) {
  const slug = id ?? String(children).toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
  return (
    <h3 id={slug} className="text-base font-semibold text-foreground mt-6 mb-3 scroll-mt-24">
      {children}
    </h3>
  )
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground leading-relaxed my-3">{children}</p>
}

function UList({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc list-inside space-y-1.5 my-3 text-sm text-muted-foreground">{children}</ul>
}

function OList({ children }: { children: React.ReactNode }) {
  return <ol className="list-decimal list-inside space-y-1.5 my-3 text-sm text-muted-foreground">{children}</ol>
}

function ListItem({ children }: { children: React.ReactNode }) {
  return <li className="leading-relaxed">{children}</li>
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-accent bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
      {children}
    </code>
  )
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>
}

export function getMdxComponents(): MDXComponents {
  return {
    // Headings con ID para TOC
    h2: Heading2 as any,
    h3: Heading3 as any,
    p: Paragraph as any,
    ul: UList as any,
    ol: OList as any,
    li: ListItem as any,
    code: InlineCode as any,
    strong: Strong as any,

    // Componentes de documentación
    Preview,
    DoDont,
    Do,
    Dont,
    PropsTable,
    Callout,
    UsageRule,

    // Componentes del design system (para usar en las previews)
    Btn,
  }
}
