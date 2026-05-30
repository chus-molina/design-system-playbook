import { DocPage, SectionTitle, DocText, CodeInline } from '@/components/docs/DocPage'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { Callout } from '@/components/docs/Callout'

const FIGMA_URL = 'https://www.figma.com/design/0jMlITHtt6o1CYjjvepR0N/HeroUI-Figma-Kit--Community-?node-id=0-1'

const toc = [
  { id: 'escala', label: 'Escala', level: 2 },
  { id: 'uso', label: 'Uso', level: 2 },
  { id: 'reglas', label: 'Reglas', level: 2 },
]

const scale = [
  { t: 'space-1', v: '4px', use: 'Gap mínimo entre elementos relacionados' },
  { t: 'space-2', v: '8px', use: 'Padding de chips y badges' },
  { t: 'space-3', v: '12px', use: 'Padding de inputs y botones pequeños' },
  { t: 'space-4', v: '16px', use: 'Padding de cards, secciones internas' },
  { t: 'space-6', v: '24px', use: 'Separación entre secciones' },
  { t: 'space-8', v: '32px', use: 'Padding de página, márgenes de layout' },
  { t: 'space-12', v: '48px', use: 'Separación mayor entre bloques' },
  { t: 'space-16', v: '64px', use: 'Hero sections, espaciados grandes' },
]

export default function SpacingPage() {
  return (
    <DocPage
      title="Espaciado"
      description="Un sistema de espaciado consistente basado en una unidad de 4px. Todos los márgenes, paddings y gaps son múltiplos de 4."
      figmaUrl={FIGMA_URL}
      toc={toc}
    >
      <SectionTitle id="escala">Escala</SectionTitle>
      <div className="space-y-3 my-5">
        {scale.map(s => (
          <div key={s.t} className="flex items-center gap-4">
            <div className="bg-accent/30 border border-accent/50 rounded flex-shrink-0" style={{ width: s.v, height: '24px', minWidth: s.v }} />
            <div className="flex items-baseline gap-2">
              <code className="text-xs text-accent font-mono">{s.t}</code>
              <span className="text-xs text-muted-foreground">{s.v}</span>
            </div>
            <span className="text-xs text-muted-foreground ml-auto text-right">{s.use}</span>
          </div>
        ))}
      </div>

      <SectionTitle id="uso">Uso</SectionTitle>
      <CodeBlock
        filename="Uso en layout"
        language="tsx"
        code={`<main className="p-8 max-w-4xl">
  <div className="space-y-6">
    <div className="p-4 rounded-xl border">
      <div className="flex items-center gap-3">...</div>
    </div>
  </div>
</main>`}
      />

      <SectionTitle id="reglas">Reglas</SectionTitle>
      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground my-3">
        <li>Elementos relacionados: <CodeInline>gap-2</CodeInline> o <CodeInline>gap-3</CodeInline></li>
        <li>Secciones distintas: <CodeInline>space-y-6</CodeInline> o <CodeInline>space-y-8</CodeInline></li>
        <li>Nunca uses valores ad-hoc — elige el múltiplo de 4 más cercano.</li>
      </ul>
      <Callout type="tip" title="La regla del 4">
        Si dudas entre dos valores, elige siempre un múltiplo de 4. La consistencia del espaciado es lo que hace que una interfaz se sienta &quot;pulida&quot;.
      </Callout>
    </DocPage>
  )
}
