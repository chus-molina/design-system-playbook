import { ComponentDoc } from '@/components/docs/ComponentDoc'
import { TokenTable } from '@/components/docs/TokenTable'
import { CodeBlock } from '@/components/docs/CodeBlock'

const typeScale = [
  { name: 'text-xs', value: '12px / 0.75rem', description: 'Etiquetas, metadata, chips' },
  { name: 'text-sm', value: '14px / 0.875rem', description: 'Cuerpo secundario, UI labels' },
  { name: 'text-base', value: '16px / 1rem', description: 'Cuerpo principal' },
  { name: 'text-lg', value: '18px / 1.125rem', description: 'Introducción de sección' },
  { name: 'text-xl', value: '20px / 1.25rem', description: 'Subtítulos' },
  { name: 'text-2xl', value: '24px / 1.5rem', description: 'Títulos de sección' },
  { name: 'text-3xl', value: '30px / 1.875rem', description: 'Títulos de página' },
  { name: 'text-4xl', value: '36px / 2.25rem', description: 'Hero/Display' },
]

const weightTokens = [
  { name: 'font-normal', value: '400', description: 'Cuerpo de texto' },
  { name: 'font-medium', value: '500', description: 'Labels, botones' },
  { name: 'font-semibold', value: '600', description: 'Subtítulos, emphasis' },
  { name: 'font-bold', value: '700', description: 'Títulos, CTAs destacados' },
]

const usageCode = `// Título de página
<h1 className="text-3xl font-bold text-foreground">Título</h1>

// Subtítulo de sección
<h2 className="text-xl font-semibold text-foreground">Sección</h2>

// Cuerpo principal
<p className="text-base text-muted-foreground leading-relaxed">Contenido...</p>

// Label de formulario
<label className="text-sm font-medium text-foreground">Email</label>

// Metadata / chip
<span className="text-xs text-muted-foreground">hace 3 horas</span>`

export default function TypographyPage() {
  return (
    <ComponentDoc
      name="Tipografía"
      description="Escala tipográfica, pesos y guías de uso para textos en el sistema."
      tabs={[
        {
          id: 'design',
          label: 'Diseño',
          content: (
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Escala tipográfica</h2>
                <div className="space-y-3">
                  {typeScale.map(t => (
                    <div key={t.name} className="flex items-baseline gap-4 py-3 border-b border-border last:border-0">
                      <span className={`${t.name} font-medium text-foreground min-w-[180px]`}>The quick brown fox</span>
                      <div className="text-right ml-auto">
                        <p className="text-xs font-mono text-accent">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.value}</p>
                        <p className="text-xs text-muted-foreground">{t.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Familia tipográfica</h2>
                <div className="p-4 rounded-xl border border-border bg-card">
                  <p className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>Inter</p>
                  <p className="text-sm text-muted-foreground mt-1">Fuente principal del sistema — Google Fonts</p>
                  <p className="text-xs text-muted-foreground mt-3 font-mono">
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                    abcdefghijklmnopqrstuvwxyz<br />
                    0123456789 !@#$%^&*()
                  </p>
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
              <TokenTable tokens={typeScale} title="Clases de tamaño" />
              <TokenTable tokens={weightTokens} title="Pesos" />
              <CodeBlock code={usageCode} language="tsx" filename="Uso típico" />
            </div>
          ),
        },
        {
          id: 'content',
          label: 'Contenido',
          content: (
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-foreground font-semibold">Jerarquía</h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li>Usa <code className="text-accent bg-muted px-1 rounded">h1</code> una sola vez por página.</li>
                <li>Los subtítulos (<code className="text-accent bg-muted px-1 rounded">h2</code>) articulan secciones, no decoración.</li>
                <li>El cuerpo de texto usa <code className="text-accent bg-muted px-1 rounded">text-base</code> con <code className="text-accent bg-muted px-1 rounded">leading-relaxed</code>.</li>
              </ul>
              <h3 className="text-foreground font-semibold mt-4">Microcopy</h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li>Labels de botón: imperativo, sin punto — "Guardar cambios" no "Guardar los cambios."</li>
                <li>Placeholders: describen el formato esperado, no repiten el label.</li>
                <li>Mensajes de error: explican qué pasó y cómo solucionarlo.</li>
              </ul>
            </div>
          ),
        },
      ]}
    />
  )
}
