import { ComponentDoc } from '@/components/docs/ComponentDoc'
import { TokenTable } from '@/components/docs/TokenTable'
import { CodeBlock } from '@/components/docs/CodeBlock'

const colorTokens = [
  { name: '--color-primary', value: 'hsl(221, 83%, 53%)', preview: 'hsl(221, 83%, 53%)', description: 'Acción principal, CTAs' },
  { name: '--color-primary-foreground', value: 'hsl(0, 0%, 100%)', preview: '#fff', description: 'Texto sobre primario' },
  { name: '--color-secondary', value: 'hsl(210, 40%, 96%)', preview: 'hsl(210,40%,96%)', description: 'Acciones secundarias' },
  { name: '--color-destructive', value: 'hsl(0, 84%, 60%)', preview: 'hsl(0,84%,60%)', description: 'Errores y acciones destructivas' },
  { name: '--color-success', value: 'hsl(142, 71%, 45%)', preview: 'hsl(142,71%,45%)', description: 'Confirmaciones' },
  { name: '--color-warning', value: 'hsl(38, 92%, 50%)', preview: 'hsl(38,92%,50%)', description: 'Avisos' },
  { name: '--color-muted', value: 'hsl(210, 40%, 96%)', preview: 'hsl(210,40%,96%)', description: 'Fondos sutiles' },
  { name: '--color-border', value: 'hsl(214, 32%, 91%)', preview: 'hsl(214,32%,91%)', description: 'Bordes UI' },
]

const semanticTokens = [
  { name: '--background', value: 'hsl(0, 0%, 100%)', preview: '#fff', description: 'Fondo de página' },
  { name: '--foreground', value: 'hsl(222, 84%, 5%)', preview: 'hsl(222,84%,5%)', description: 'Texto principal' },
  { name: '--card', value: 'hsl(0, 0%, 100%)', preview: '#fff', description: 'Fondo de cards' },
  { name: '--sidebar-bg', value: 'hsl(0, 0%, 98%)', preview: 'hsl(0,0%,98%)', description: 'Fondo sidebar' },
]

const swatchCode = `// tailwind.config.ts
colors: {
  accent: 'hsl(var(--accent) / <alpha-value>)',
  background: 'hsl(var(--background) / <alpha-value>)',
  foreground: 'hsl(var(--foreground) / <alpha-value>)',
  muted: {
    DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
    foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
  },
  border: 'hsl(var(--border) / <alpha-value>)',
  destructive: 'hsl(var(--destructive) / <alpha-value>)',
}`

const paletteGroups = [
  { name: 'Primary', colors: ['#dbeafe', '#93c5fd', '#3b82f6', '#2563eb', '#1d4ed8', '#1e3a8a'] },
  { name: 'Neutral', colors: ['#f8fafc', '#e2e8f0', '#94a3b8', '#64748b', '#334155', '#0f172a'] },
  { name: 'Success', colors: ['#dcfce7', '#86efac', '#22c55e', '#16a34a', '#166534', '#052e16'] },
  { name: 'Danger', colors: ['#fee2e2', '#fca5a5', '#ef4444', '#dc2626', '#b91c1c', '#450a0a'] },
  { name: 'Warning', colors: ['#fef9c3', '#fde047', '#eab308', '#ca8a04', '#854d0e', '#422006'] },
]

export default function ColorsPage() {
  return (
    <ComponentDoc
      name="Colores"
      description="Paleta de colores y tokens semánticos del sistema de diseño."
      tabs={[
        {
          id: 'design',
          label: 'Diseño',
          content: (
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Paleta base</h2>
                {paletteGroups.map(group => (
                  <div key={group.name}>
                    <p className="text-xs text-muted-foreground mb-2 font-medium">{group.name}</p>
                    <div className="flex gap-2">
                      {group.colors.map(color => (
                        <div key={color} className="flex-1">
                          <div className="h-10 rounded-lg border border-border" style={{ background: color }} />
                          <p className="text-xs text-muted-foreground mt-1 text-center font-mono">{color}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Uso por contexto</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Acción principal', bg: 'bg-[hsl(221,83%,53%)]', text: 'text-white', note: 'CTA primario' },
                    { label: 'Error / Destructivo', bg: 'bg-[hsl(0,84%,60%)]', text: 'text-white', note: 'Acciones irreversibles' },
                    { label: 'Éxito', bg: 'bg-[hsl(142,71%,45%)]', text: 'text-white', note: 'Confirmaciones' },
                    { label: 'Aviso', bg: 'bg-[hsl(38,92%,50%)]', text: 'text-white', note: 'Información importante' },
                  ].map(item => (
                    <div key={item.label} className={`${item.bg} ${item.text} p-4 rounded-xl`}>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs opacity-75 mt-0.5">{item.note}</p>
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
              <TokenTable tokens={colorTokens} title="Tokens de color base" />
              <TokenTable tokens={semanticTokens} title="Tokens semánticos" />
              <CodeBlock code={swatchCode} language="ts" filename="tailwind.config.ts" />
            </div>
          ),
        },
        {
          id: 'content',
          label: 'Contenido',
          content: (
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-foreground font-semibold">Accesibilidad</h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li>El color primario (#2563eb) cumple ratio WCAG AA sobre fondo blanco.</li>
                <li>Nunca uses color como único indicador de estado — acompaña siempre con texto o icono.</li>
                <li>El texto sobre fondos de color debe tener ratio mínimo de 4.5:1 (AA) o 7:1 (AAA).</li>
              </ul>
              <h3 className="text-foreground font-semibold mt-4">Cómo elegir el color correcto</h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li><strong className="text-foreground">Azul primario:</strong> CTAs, enlaces, elementos interactivos activos.</li>
                <li><strong className="text-foreground">Rojo destructivo:</strong> Eliminar, cancelar suscripción, acciones irreversibles.</li>
                <li><strong className="text-foreground">Verde éxito:</strong> Confirmaciones, guardado correcto, validaciones ok.</li>
                <li><strong className="text-foreground">Ámbar aviso:</strong> Información que necesita atención pero no es un error.</li>
              </ul>
            </div>
          ),
        },
      ]}
    />
  )
}
