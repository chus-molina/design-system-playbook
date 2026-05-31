import { DocPage, SectionTitle, DocText, CodeInline } from '@/components/docs/DocPage'
import { Callout } from '@/components/docs/Callout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { TokenChain } from '@/components/docs/TokenChain'

const FIGMA_URL = 'https://www.figma.com/design/0jMlITHtt6o1CYjjvepR0N/HeroUI-Figma-Kit--Community-?node-id=0-1'

const toc = [
  { id: 'paleta', label: 'Paleta base', level: 2 },
  { id: 'jerarquia', label: 'Jerarquía de tokens', level: 2 },
  { id: 'cadenas', label: 'Tokens por color', level: 2 },
  { id: 'uso', label: 'Uso en código', level: 2 },
  { id: 'accesibilidad', label: 'Accesibilidad', level: 2 },
]

const scaleSteps = ['50', '100', '300', '500', '700', '900']

const palettes = [
  { name: 'Primary', prefix: 'blue', colors: ['#dbeafe', '#93c5fd', '#3b82f6', '#2563eb', '#1d4ed8', '#1e3a8a'] },
  { name: 'Neutral', prefix: 'neutral', colors: ['#f8fafc', '#e2e8f0', '#94a3b8', '#64748b', '#334155', '#0f172a'] },
  { name: 'Success', prefix: 'green', colors: ['#dcfce7', '#86efac', '#22c55e', '#16a34a', '#166534', '#052e16'] },
  { name: 'Danger', prefix: 'red', colors: ['#fee2e2', '#fca5a5', '#ef4444', '#dc2626', '#b91c1c', '#450a0a'] },
  { name: 'Warning', prefix: 'yellow', colors: ['#fef9c3', '#fde047', '#eab308', '#ca8a04', '#854d0e', '#422006'] },
]

export default function ColorsPage() {
  return (
    <DocPage
      title="Colores"
      description="El color comunica jerarquía, estado y marca. El sistema usa una arquitectura de tokens en cascada: del valor crudo hasta el token específico de componente."
      figmaUrl={FIGMA_URL}
      toc={toc}
    >
      <SectionTitle id="paleta">Paleta base</SectionTitle>
      <DocText>
        Cada familia tiene 6 tonos (global tokens), del más claro al más oscuro. El tono <CodeInline>500</CodeInline> es el principal. Estos son la base de toda la cascada de tokens.
      </DocText>
      <div className="space-y-6 my-5">
        {palettes.map(p => (
          <div key={p.name}>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">{p.name}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {p.colors.map((c, i) => (
                <div key={c} className="rounded-lg border border-border overflow-hidden bg-card">
                  <div className="h-14" style={{ background: c }} />
                  <div className="p-2 space-y-0.5">
                    <p className="text-[11px] font-semibold text-foreground">{p.prefix}-{scaleSteps[i]}</p>
                    <p className="text-[10px] text-muted-foreground font-mono uppercase">{c}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SectionTitle id="jerarquia">Jerarquía de tokens</SectionTitle>
      <DocText>
        Un token nunca apunta directamente a un valor. Pasa por niveles de abstracción: el componente referencia un <strong className="text-foreground">alias</strong>, el alias referencia un <strong className="text-foreground">global token</strong>, y este contiene el <strong className="text-foreground">valor</strong>. Cambiar un nivel propaga el cambio hacia arriba sin tocar los componentes.
      </DocText>
      <div className="rounded-xl border border-border bg-muted/20 p-6 my-5">
        <TokenChain
          levels={[
            { token: 'drop-zone-background-color', type: 'Component-specific token', swatch: '#2563eb' },
            { token: 'accent-visual-color', type: 'Alias token', swatch: '#2563eb' },
            { token: 'blue-500', type: 'Global token', swatch: '#2563eb' },
            { token: '#2563EB', type: 'Value', swatch: '#2563eb' },
          ]}
        />
      </div>
      <Callout type="info" title="¿Por qué tantos niveles?">
        Si mañana el primario cambia de azul a violeta, solo editas el <CodeInline>alias token</CodeInline>. Todos los componentes que lo usan se actualizan automáticamente, sin tocar una sola línea de cada componente.
      </Callout>

      <SectionTitle id="cadenas">Tokens por color</SectionTitle>
      <DocText>La cadena completa de cada color semántico del sistema, desde el token de componente hasta el valor final.</DocText>

      <div className="space-y-6 my-5">
        <div className="rounded-xl border border-border bg-card p-5">
          <TokenChain
            title="Primary — acción principal"
            levels={[
              { token: 'button-background-color', type: 'Component-specific token', swatch: '#2563eb' },
              { token: 'accent-color', type: 'Alias token', swatch: '#2563eb' },
              { token: 'blue-500', type: 'Global token', swatch: '#2563eb' },
              { token: '#2563EB', type: 'Value', swatch: '#2563eb' },
            ]}
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <TokenChain
            title="Danger — acciones destructivas"
            levels={[
              { token: 'delete-button-color', type: 'Component-specific token', swatch: '#ef4444' },
              { token: 'destructive-color', type: 'Alias token', swatch: '#ef4444' },
              { token: 'red-500', type: 'Global token', swatch: '#ef4444' },
              { token: '#EF4444', type: 'Value', swatch: '#ef4444' },
            ]}
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <TokenChain
            title="Success — confirmaciones"
            levels={[
              { token: 'toast-success-color', type: 'Component-specific token', swatch: '#22c55e' },
              { token: 'success-color', type: 'Alias token', swatch: '#22c55e' },
              { token: 'green-500', type: 'Global token', swatch: '#22c55e' },
              { token: '#22C55E', type: 'Value', swatch: '#22c55e' },
            ]}
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <TokenChain
            title="Warning — avisos"
            levels={[
              { token: 'badge-warning-color', type: 'Component-specific token', swatch: '#eab308' },
              { token: 'warning-color', type: 'Alias token', swatch: '#eab308' },
              { token: 'yellow-500', type: 'Global token', swatch: '#eab308' },
              { token: '#EAB308', type: 'Value', swatch: '#eab308' },
            ]}
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <TokenChain
            title="Neutral — texto y bordes"
            levels={[
              { token: 'card-border-color', type: 'Component-specific token', swatch: '#e2e8f0' },
              { token: 'border-color', type: 'Alias token', swatch: '#e2e8f0' },
              { token: 'neutral-100', type: 'Global token', swatch: '#e2e8f0' },
              { token: '#E2E8F0', type: 'Value', swatch: '#e2e8f0' },
            ]}
          />
        </div>
      </div>

      <SectionTitle id="uso">Uso en código</SectionTitle>
      <DocText>Usa siempre los tokens semánticos (alias) en el código, nunca el global token ni el valor hex directo.</DocText>
      <CodeBlock
        filename="globals.css"
        language="css"
        code={`:root {
  /* Global tokens — la escala cruda */
  --blue-500: #2563eb;
  --red-500: #ef4444;
  --neutral-100: #e2e8f0;

  /* Alias tokens — apuntan a la escala */
  --accent-color: var(--blue-500);
  --destructive-color: var(--red-500);
  --border-color: var(--neutral-100);
}

.dark {
  /* Solo redefinimos los alias en modo oscuro */
  --accent-color: var(--blue-400);
  --border-color: var(--neutral-700);
}`}
      />
      <CodeBlock
        filename="Uso en componentes"
        language="tsx"
        code={`<button className="bg-accent text-accent-foreground">Primario</button>
<div className="border border-border">Con borde</div>
<p className="text-destructive">Error</p>`}
      />

      <SectionTitle id="accesibilidad">Accesibilidad</SectionTitle>
      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground my-3">
        <li>El primario (#2563EB) cumple ratio WCAG AA sobre fondo blanco (4.5:1).</li>
        <li>Nunca uses el color como único indicador de estado — acompáñalo con texto o icono.</li>
        <li>El texto sobre fondos de color debe tener ratio mínimo 4.5:1 (AA) o 7:1 (AAA).</li>
      </ul>
      <Callout type="warning" title="Daltonismo">
        El 8% de los hombres tiene algún tipo de daltonismo. Un error en rojo sin icono ni texto puede ser invisible para ellos.
      </Callout>
    </DocPage>
  )
}
