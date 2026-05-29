import { ComponentDoc } from '@/components/docs/ComponentDoc'
import { TokenTable } from '@/components/docs/TokenTable'
import { CodeBlock } from '@/components/docs/CodeBlock'

const spacingScale = [
  { name: 'space-1 / p-1', value: '4px', description: 'Gap mínimo entre elementos relacionados' },
  { name: 'space-2 / p-2', value: '8px', description: 'Padding interno de chips y badges' },
  { name: 'space-3 / p-3', value: '12px', description: 'Padding de inputs y botones pequeños' },
  { name: 'space-4 / p-4', value: '16px', description: 'Padding de cards, secciones internas' },
  { name: 'space-5 / p-5', value: '20px', description: 'Padding de contenedores grandes' },
  { name: 'space-6 / p-6', value: '24px', description: 'Separación entre secciones' },
  { name: 'space-8 / p-8', value: '32px', description: 'Padding de página, márgenes de layout' },
  { name: 'space-12', value: '48px', description: 'Separación mayor entre bloques' },
  { name: 'space-16', value: '64px', description: 'Hero sections, espaciados grandes' },
]

const code = `// Layout de página
<main className="p-8 max-w-4xl">
  {/* Sección con espacio entre bloques */}
  <div className="space-y-6">
    <div className="p-4 rounded-xl border">
      {/* Elementos internos */}
      <div className="flex items-center gap-3">...</div>
    </div>
  </div>
</main>`

export default function SpacingPage() {
  return (
    <ComponentDoc
      name="Espaciado"
      description="Sistema de espaciado basado en múltiplos de 4px para consistencia visual."
      tabs={[
        {
          id: 'design',
          label: 'Diseño',
          content: (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                El sistema usa una base de <strong className="text-foreground">4px</strong>. Todos los valores de margen, padding y gap son múltiplos de 4.
              </p>
              <div className="space-y-3">
                {spacingScale.map(s => (
                  <div key={s.name} className="flex items-center gap-4">
                    <div
                      className="bg-accent/30 border border-accent/50 rounded flex-shrink-0"
                      style={{ width: s.value, height: '24px', minWidth: s.value }}
                    />
                    <div>
                      <span className="text-xs font-mono text-accent">{s.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{s.value}</span>
                      <p className="text-xs text-muted-foreground">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          id: 'build',
          label: 'Desarrollo',
          content: (
            <div className="space-y-6">
              <TokenTable tokens={spacingScale} title="Escala de espaciado" />
              <CodeBlock code={code} language="tsx" filename="Uso en layout" />
            </div>
          ),
        },
        {
          id: 'content',
          label: 'Contenido',
          content: (
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-foreground font-semibold">Reglas de espaciado</h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li>Elementos relacionados: <strong className="text-foreground">gap-2 o gap-3</strong></li>
                <li>Secciones diferentes: <strong className="text-foreground">space-y-6 o space-y-8</strong></li>
                <li>Nunca uses valores ad-hoc — elige el múltiplo de 4 más próximo.</li>
              </ul>
            </div>
          ),
        },
      ]}
    />
  )
}
