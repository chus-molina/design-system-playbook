import { DocPage, SectionTitle, DocText, CodeInline } from '@/components/docs/DocPage'
import { Callout } from '@/components/docs/Callout'
import { CodeBlock } from '@/components/docs/CodeBlock'

const FIGMA_URL = 'https://www.figma.com/design/0jMlITHtt6o1CYjjvepR0N/HeroUI-Figma-Kit--Community-?node-id=0-1'

const toc = [
  { id: 'paleta', label: 'Paleta base', level: 2 },
  { id: 'semantica', label: 'Color semántico', level: 2 },
  { id: 'tokens', label: 'Tokens y variables', level: 2 },
  { id: 'accesibilidad', label: 'Accesibilidad', level: 2 },
]

const scaleSteps = ['50', '100', '300', '500', '700', '900']

const palettes = [
  { name: 'Primary', prefix: 'primary', colors: ['#dbeafe', '#93c5fd', '#3b82f6', '#2563eb', '#1d4ed8', '#1e3a8a'] },
  { name: 'Neutral', prefix: 'neutral', colors: ['#f8fafc', '#e2e8f0', '#94a3b8', '#64748b', '#334155', '#0f172a'] },
  { name: 'Success', prefix: 'success', colors: ['#dcfce7', '#86efac', '#22c55e', '#16a34a', '#166534', '#052e16'] },
  { name: 'Danger', prefix: 'danger', colors: ['#fee2e2', '#fca5a5', '#ef4444', '#dc2626', '#b91c1c', '#450a0a'] },
  { name: 'Warning', prefix: 'warning', colors: ['#fef9c3', '#fde047', '#eab308', '#ca8a04', '#854d0e', '#422006'] },
]

const semanticTokens = [
  { token: '--color-primary', tailwind: 'bg-accent', variable: 'primary-500', hex: '#2563eb', note: 'Acción principal, enlaces, CTAs' },
  { token: '--color-danger', tailwind: 'bg-destructive', variable: 'danger-500', hex: '#ef4444', note: 'Errores, acciones destructivas' },
  { token: '--color-success', tailwind: 'bg-success', variable: 'success-500', hex: '#22c55e', note: 'Confirmaciones, validaciones ok' },
  { token: '--color-warning', tailwind: 'bg-warning', variable: 'warning-500', hex: '#eab308', note: 'Avisos que requieren atención' },
  { token: '--color-foreground', tailwind: 'text-foreground', variable: 'neutral-900', hex: '#0f172a', note: 'Texto principal' },
  { token: '--color-muted-foreground', tailwind: 'text-muted-foreground', variable: 'neutral-500', hex: '#64748b', note: 'Texto secundario' },
  { token: '--color-border', tailwind: 'border-border', variable: 'neutral-100', hex: '#e2e8f0', note: 'Bordes y separadores' },
  { token: '--color-card', tailwind: 'bg-card', variable: 'neutral-50', hex: '#f8fafc', note: 'Superficie de cards' },
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
      <DocText>
        Cada familia tiene 6 tonos, del más claro al más oscuro. El tono <CodeInline>500</CodeInline> es el principal. Cada muestra incluye su token, su variable de escala y el valor hexadecimal.
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
                    <p className="text-[11px] font-semibold text-foreground">{p.name} {scaleSteps[i]}</p>
                    <p className="text-[10px] text-accent font-mono break-all">--color-{p.prefix}-{scaleSteps[i]}</p>
                    <p className="text-[10px] text-muted-foreground font-mono uppercase">{c}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SectionTitle id="semantica">Color semántico</SectionTitle>
      <DocText>No elijas un color por su aspecto, sino por su significado. Cada token semántico apunta a una variable de la paleta base.</DocText>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
        {semanticTokens.slice(0, 4).map(t => (
          <div key={t.token} className="rounded-xl overflow-hidden border border-border">
            <div className="p-4 text-white" style={{ background: t.hex }}>
              <p className="font-semibold text-sm">{t.token.replace('--color-', '').replace('-', ' ')}</p>
              <p className="text-xs opacity-80 mt-0.5">{t.note}</p>
            </div>
            <div className="p-3 bg-card space-y-1">
              <div className="flex justify-between text-[11px]"><span className="text-muted-foreground">Token</span><code className="text-accent font-mono">{t.token}</code></div>
              <div className="flex justify-between text-[11px]"><span className="text-muted-foreground">Variable</span><code className="text-muted-foreground font-mono">--color-{t.variable}</code></div>
              <div className="flex justify-between text-[11px]"><span className="text-muted-foreground">Hex</span><code className="text-muted-foreground font-mono uppercase">{t.hex}</code></div>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle id="tokens">Tokens y variables</SectionTitle>
      <DocText>Tabla completa de tokens semánticos: el token, la clase de Tailwind, la variable de la escala base a la que apunta y su valor.</DocText>
      <div className="my-5 border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">Muestra</th>
              <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">Token CSS</th>
              <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">Clase Tailwind</th>
              <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">Variable</th>
              <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">Hex</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {semanticTokens.map(t => (
              <tr key={t.token} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-2.5"><div className="w-6 h-6 rounded border border-border" style={{ background: t.hex }} /></td>
                <td className="px-4 py-2.5"><code className="text-xs text-accent font-mono">{t.token}</code></td>
                <td className="px-4 py-2.5"><code className="text-xs font-mono bg-muted text-muted-foreground px-1.5 py-0.5 rounded">{t.tailwind}</code></td>
                <td className="px-4 py-2.5"><code className="text-xs text-muted-foreground font-mono">--color-{t.variable}</code></td>
                <td className="px-4 py-2.5"><code className="text-xs text-muted-foreground font-mono uppercase">{t.hex}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DocText>Usa siempre los tokens semánticos en el código, nunca valores hex directos. Así el modo oscuro funciona automáticamente.</DocText>
      <CodeBlock
        filename="globals.css"
        language="css"
        code={`:root {
  /* Escala base */
  --color-primary-500: #2563eb;
  --color-neutral-900: #0f172a;

  /* Tokens semánticos → apuntan a la escala */
  --color-accent: var(--color-primary-500);
  --color-foreground: var(--color-neutral-900);
  --color-border: var(--color-neutral-100);
}

.dark {
  --color-foreground: var(--color-neutral-50);
  --color-border: var(--color-neutral-700);
}`}
      />
      <CodeBlock
        filename="Uso en componentes"
        language="tsx"
        code={`<div className="bg-accent text-accent-foreground">Primario</div>
<div className="text-muted-foreground">Texto secundario</div>
<div className="border border-border">Con borde</div>`}
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
