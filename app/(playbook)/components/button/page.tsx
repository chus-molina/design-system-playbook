import { getPageContent } from '@/lib/content'
import { notFound } from 'next/navigation'
import { ComponentDoc } from '@/components/docs/ComponentDoc'
import { FigmaLink } from '@/components/docs/FigmaLink'
import { MarkdownContent } from '@/components/docs/MarkdownContent'
import { TokenTable } from '@/components/docs/TokenTable'
import { CodeBlock } from '@/components/docs/CodeBlock'

const variantTokens = [
  { name: 'variant: primary', value: 'bg-accent text-accent-foreground hover:bg-accent/90', description: 'Acción principal' },
  { name: 'variant: secondary', value: 'bg-muted text-foreground hover:bg-muted/80', description: 'Acción alternativa' },
  { name: 'variant: outline', value: 'border border-border bg-transparent hover:bg-muted', description: 'Acción neutral' },
  { name: 'variant: ghost', value: 'bg-transparent hover:bg-muted', description: 'Acción terciaria' },
  { name: 'variant: destructive', value: 'bg-destructive text-white hover:bg-destructive/90', description: 'Acción irreversible' },
]

const componentCode = `// components/ui/Button.tsx
export const Button = ({ variant = 'primary', size = 'md', loading, className, children, disabled, ...props }) => (
  <button disabled={disabled || loading} className={cn(variants[variant], sizes[size], className)} {...props}>
    {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
    {children}
  </button>
)`

export default function ButtonPage() {
  const page = getPageContent('components', 'button')
  if (!page) notFound()

  return (
    <ComponentDoc
      name={page.title}
      description={page.description}
      figmaLink={page.figmaUrl ? <FigmaLink url={page.figmaUrl} /> : null}
      tabs={[
        {
          id: 'design',
          label: 'Diseño',
          content: (
            <div className="space-y-8">
              <MarkdownContent content={page.sections.design} />
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Vista previa</h2>
                <div className="flex flex-wrap gap-3 p-6 rounded-xl border border-border bg-card">
                  {[
                    { label: 'Primary', cls: 'bg-[hsl(221,83%,53%)] text-white' },
                    { label: 'Secondary', cls: 'bg-muted text-foreground' },
                    { label: 'Outline', cls: 'border border-border bg-transparent text-foreground' },
                    { label: 'Ghost', cls: 'bg-transparent text-foreground' },
                    { label: 'Destructive', cls: 'bg-[hsl(0,84%,60%)] text-white' },
                  ].map(v => (
                    <button key={v.label} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${v.cls}`}>{v.label}</button>
                  ))}
                </div>
              </div>
            </div>
          ),
        },
        {
          id: 'build',
          label: 'Desarrollo',
          content: (
            <div className="space-y-6">
              <MarkdownContent content={page.sections.build} />
              <TokenTable tokens={variantTokens} title="Tokens de variantes" />
              <CodeBlock code={componentCode} language="tsx" filename="components/ui/Button.tsx" />
            </div>
          ),
        },
        {
          id: 'content',
          label: 'Contenido',
          content: <MarkdownContent content={page.sections.content} />,
        },
      ]}
    />
  )
}
