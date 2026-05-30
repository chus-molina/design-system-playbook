import { DocPage, SectionTitle, DocText, CodeInline } from '@/components/docs/DocPage'
import { Preview } from '@/components/docs/Preview'
import { CodeBlock } from '@/components/docs/CodeBlock'

const FIGMA_URL = 'https://www.figma.com/design/0jMlITHtt6o1CYjjvepR0N/HeroUI-Figma-Kit--Community-?node-id=0-1'

const toc = [
  { id: 'app', label: 'Layout de aplicación', level: 2 },
  { id: 'grid', label: 'Grid de cards', level: 2 },
  { id: 'anchuras', label: 'Anchuras', level: 2 },
]

export default function LayoutsPage() {
  return (
    <DocPage
      title="Layouts"
      description="Estructuras de página y patrones de composición para los principales tipos de vista: aplicación con sidebar, grids de contenido y anchuras de lectura."
      figmaUrl={FIGMA_URL}
      toc={toc}
    >
      <SectionTitle id="app">Layout de aplicación</SectionTitle>
      <DocText>Sidebar fijo a la izquierda, header sticky arriba y contenido principal con ancho máximo controlado.</DocText>
      <Preview>
        <div className="border border-slate-200 rounded-xl overflow-hidden w-full max-w-lg" style={{ height: 200 }}>
          <div className="flex h-full">
            <div className="w-32 bg-slate-50 border-r border-slate-200 p-2">
              <div className="h-3 bg-slate-200 rounded w-16 mb-3" />
              {[60, 48, 56].map(w => <div key={w} className="h-2.5 bg-slate-100 rounded mb-1.5" style={{ width: w }} />)}
            </div>
            <div className="flex-1 flex flex-col">
              <div className="h-8 bg-white border-b border-slate-200" />
              <div className="flex-1 p-4 space-y-2">
                <div className="h-5 bg-slate-100 rounded w-40" />
                <div className="h-3 bg-slate-100 rounded w-full" />
                <div className="h-3 bg-slate-100 rounded w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </Preview>
      <CodeBlock
        filename="app/(playbook)/layout.tsx"
        language="tsx"
        code={`<div className="flex min-h-screen bg-background">
  <Sidebar className="w-64 flex-shrink-0" />
  <div className="flex-1 flex flex-col min-w-0">
    <Header className="sticky top-0 z-40 h-14" />
    <main className="flex-1 p-8 w-full">{children}</main>
  </div>
</div>`}
      />

      <SectionTitle id="grid">Grid de cards</SectionTitle>
      <Preview>
        <div className="grid grid-cols-3 gap-2 w-full max-w-md">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="p-3 rounded-lg border border-slate-200 bg-white">
              <div className="h-3 bg-slate-100 rounded w-3/4 mb-1.5" />
              <div className="h-2.5 bg-slate-100 rounded w-full mb-1" />
              <div className="h-2.5 bg-slate-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      </Preview>
      <CodeBlock
        filename="Grid responsive"
        language="tsx"
        code={`<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id}>...</Card>)}
</div>`}
      />

      <SectionTitle id="anchuras">Anchuras de contenido</SectionTitle>
      <div className="space-y-2 my-5">
        {[
          { cls: 'max-w-sm', px: '384px', use: 'Formularios de auth, modales' },
          { cls: 'max-w-md', px: '448px', use: 'Formularios de configuración' },
          { cls: 'max-w-2xl', px: '672px', use: 'Artículos, documentación' },
          { cls: 'max-w-4xl', px: '896px', use: 'Área principal del playbook' },
          { cls: 'max-w-6xl', px: '1152px', use: 'Dashboards, tablas de datos' },
        ].map(r => (
          <div key={r.cls} className="flex justify-between items-center py-2 border-b border-border">
            <div className="flex items-baseline gap-2">
              <code className="text-xs text-accent font-mono">{r.cls}</code>
              <span className="text-xs text-muted-foreground">{r.px}</span>
            </div>
            <span className="text-xs text-muted-foreground">{r.use}</span>
          </div>
        ))}
      </div>
      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground my-3">
        <li>El contenido principal nunca supera <CodeInline>max-w-4xl</CodeInline> para preservar la legibilidad.</li>
        <li>Usa <CodeInline>min-w-0</CodeInline> en contenedores flex para evitar desbordamientos.</li>
      </ul>
    </DocPage>
  )
}
