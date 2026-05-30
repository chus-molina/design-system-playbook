import { DocPage, SectionTitle, SubTitle, DocText, CodeInline } from '@/components/docs/DocPage'
import { Callout } from '@/components/docs/Callout'
import { CodeBlock } from '@/components/docs/CodeBlock'

const FIGMA_URL = 'https://www.figma.com/design/0jMlITHtt6o1CYjjvepR0N/HeroUI-Figma-Kit--Community-?node-id=0-1'

const toc = [
  { id: 'paleta', label: 'Paleta base', level: 2 },
  { id: 'semantica', label: 'Color semántico', level: 2 },
  { id: 'tokens', label: 'Tokens', level: 2 },
  { id: 'accesibilidad', label: 'Accesibilidad', level: 2 },
]

const palettes = [
  { name: 'Primary', colors: ['#dbeafe', '#93c5fd', '#3b82f6', '#2563eb', '#1d4ed8', '#1e3a8a'] },
  { name: 'Neutral', colors: ['#f8fafc', '#e2e8f0', '#94a3b8', '#64748b', '#334155', '#0f172a'] },
  { name: 'Success', colors: ['#dcfce7', '#86efac', '#22c55e', '#16a34a', '#166534', '#052e16'] },
  { name: 'Danger', colors: ['#fee2e2', '#fca5a5', '#ef4444', '#dc2626', '#b91c1c', '#450a0a'] },
  { name: 'Warning', colors: ['#fef9c3', '#fde047', '#eab308', '#ca8a04', '#854d0e', '#422006'] },
]

export default function ColorsPage() {
  return (
    <DocPage
      title="Colores"
      description="El color comunica jerarquía, estado y marca. El sistema usa tokens semánticos que se adaptan automáticamente al modo claro y oscuro."
      figmaUrl={FIGMA_URL}
      toc={toc}
    >
      <SectionTitle id="paleta">Paleta base</SectionTitle>
      <DocText>Cada familia de color tiene 6 tonos, del más claro al más oscuro. El tono 500 (cuarta posición) es el principal de cada familia.</DocText>
      <div className="space-y-4 my-5">
        {palettes.map(p => (
          <div key={p.name}>
            <p className="text-xs font-medium text-muted-foreground mb-2">{p.name}</p>
            <div className="flex gap-2">
              {p.colors.map(c => (
                <div key={c} className="flex-1">
                  <div className="h-12 rounded-lg border border-border" style={{ background: c }} />
                  <p className="text-[10px] text-muted-foreground mt-1 text-center font-mono">{c}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SectionTitle id="semantica">Color semántico</SectionTitle>
      <DocText>No elijas un color por su aspecto, sino por su significado. Cada color tiene un propósito asignado.</DocText>
      <div className="grid grid-cols-2 gap-3 my-5">
        {[
          { bg: '#2563eb', label: 'Primary', note: 'Acción principal, enlaces, CTAs' },
          { bg: '#ef4444', label: 'Danger', note: 'Errores, acciones destructivas' },
          { bg: '#22c55e', label: 'Success', note: 'Confirmaciones, validaciones ok' },
          { bg: '#eab308', label: 'Warning', note: 'Avisos que requieren atención' },
        ].map(c => (
          <div key={c.label} className="p-4 rounded-xl text-white" style={{ background: c.bg }}>
            <p className="font-semibold text-sm">{c.label}</p>
            <p className="text-xs opacity-80 mt-0.5">{c.note}</p>
          </div>
        ))}
      </div>

      <SectionTitle id="tokens">Tokens</SectionTitle>
      <DocText>Usa siempre los tokens semánticos en el código, nunca valores hex directos. Así el modo oscuro funciona automáticamente.</DocText>
      <CodeBlock
        filename="Uso de tokens"
        language="tsx"
        code={`<div className="bg-accent text-accent-foreground">Primario</div>
<div className="text-muted-foreground">Texto secundario</div>
<div className="border border-border">Con borde</div>
<div className="bg-card text-card-foreground">Superficie de card</div>`}
      />

      <SectionTitle id="accesibilidad">Accesibilidad</SectionTitle>
      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground my-3">
        <li>El primario (#2563eb) cumple ratio WCAG AA sobre fondo blanco (4.5:1).</li>
        <li>Nunca uses el color como único indicador de estado — acompáñalo con texto o icono.</li>
        <li>El texto sobre fondos de color debe tener ratio mínimo 4.5:1 (AA) o 7:1 (AAA).</li>
      </ul>
      <Callout type="warning" title="Daltonismo">
        El 8% de los hombres tiene algún tipo de daltonismo. Un error en rojo sin icono ni texto puede ser invisible para ellos.
      </Callout>
    </DocPage>
  )
}
