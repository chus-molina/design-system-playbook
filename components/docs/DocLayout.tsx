import { FigmaLink } from './FigmaLink'
import { TableOfContents } from './TableOfContents'

interface TocItem {
  id: string
  label: string
  level: number
}

interface DocLayoutProps {
  title: string
  description: string
  figmaUrl?: string | null
  toc?: TocItem[]
  children: React.ReactNode
}

export function DocLayout({ title, description, figmaUrl, toc = [], children }: DocLayoutProps) {
  return (
    <div className="flex gap-12 w-full">
      {/* Contenido principal */}
      <div className="flex-1 min-w-0 max-w-3xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            <p className="mt-2 text-muted-foreground text-base leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
          {figmaUrl && (
            <div className="flex-shrink-0 mt-1">
              <FigmaLink url={figmaUrl} />
            </div>
          )}
        </div>

        {/* Contenido MDX */}
        <div className="doc-content space-y-2">
          {children}
        </div>
      </div>

      {/* TOC lateral derecha */}
      {toc.length > 0 && (
        <aside className="hidden xl:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <TableOfContents items={toc} />
          </div>
        </aside>
      )}
    </div>
  )
}
