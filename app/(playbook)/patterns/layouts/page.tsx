import { ComponentDoc } from '@/components/docs/ComponentDoc'
import { CodeBlock } from '@/components/docs/CodeBlock'

const appLayoutCode = `// Estructura base del playbook
// app/(playbook)/layout.tsx
export default function PlaybookLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar fijo */}
      <Sidebar className="w-64 flex-shrink-0" />

      {/* Área de contenido */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header sticky */}
        <Header className="sticky top-0 z-40 h-14" />

        {/* Contenido principal */}
        <main className="flex-1 p-8 max-w-4xl">
          {children}
        </main>
      </div>
    </div>
  )
}`

const gridCode = `// Grid de cards responsive
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <Card key={item.id}>...</Card>
  ))}
</div>

// Dos columnas con sidebar de contenido
<div className="flex gap-8">
  <article className="flex-1 min-w-0">
    {/* Contenido principal */}
  </article>
  <aside className="w-64 flex-shrink-0">
    {/* Tabla de contenidos / filtros */}
  </aside>
</div>`

export default function LayoutsPage() {
  return (
    <ComponentDoc
      name="Layouts"
      description="Estructuras de página y patrones de composición para los principales tipos de vista."
      tabs={[
        {
          id: 'design',
          label: 'Diseño',
          content: (
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Layout de aplicación (sidebar)</h2>
                <div className="border border-border rounded-xl overflow-hidden" style={{ height: 200 }}>
                  <div className="flex h-full">
                    <div className="w-32 bg-muted/50 border-r border-border p-2">
                      <div className="h-3 bg-muted rounded w-16 mb-3" />
                      {[60, 48, 56].map(w => (
                        <div key={w} className="h-2.5 bg-muted rounded mb-1.5" style={{ width: w }} />
                      ))}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="h-8 bg-card border-b border-border" />
                      <div className="flex-1 p-4 space-y-2">
                        <div className="h-5 bg-muted rounded w-40" />
                        <div className="h-3 bg-muted rounded w-full" />
                        <div className="h-3 bg-muted rounded w-3/4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Grid de cards</h2>
                <div className="grid grid-cols-3 gap-2">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="p-3 rounded-lg border border-border bg-card">
                      <div className="h-3 bg-muted rounded w-3/4 mb-1.5" />
                      <div className="h-2.5 bg-muted rounded w-full mb-1" />
                      <div className="h-2.5 bg-muted rounded w-2/3" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Anchuras de contenido</h2>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'max-w-sm (384px)', desc: 'Formularios de auth, modales' },
                    { label: 'max-w-md (448px)', desc: 'Formularios de configuración' },
                    { label: 'max-w-2xl (672px)', desc: 'Artículos, documentación' },
                    { label: 'max-w-4xl (896px)', desc: 'Área principal del playbook' },
                    { label: 'max-w-6xl (1152px)', desc: 'Dashboards, tablas de datos' },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between items-center py-2 border-b border-border">
                      <code className="text-xs text-accent">{r.label}</code>
                      <span className="text-muted-foreground text-xs">{r.desc}</span>
                    </div>
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
              <CodeBlock code={appLayoutCode} language="tsx" filename="Estructura base del layout" />
              <CodeBlock code={gridCode} language="tsx" filename="Grids y dos columnas" />
            </div>
          ),
        },
        {
          id: 'content',
          label: 'Contenido',
          content: (
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-foreground font-semibold">Principios de layout</h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li>El contenido principal nunca supera <code className="text-accent bg-muted px-1 rounded">max-w-4xl</code> para preservar la legibilidad.</li>
                <li>El sidebar tiene ancho fijo — el contenido ocupa el espacio restante.</li>
                <li>Usa <code className="text-accent bg-muted px-1 rounded">min-w-0</code> en el contenedor flex para evitar desbordamientos.</li>
              </ul>
            </div>
          ),
        },
      ]}
    />
  )
}
