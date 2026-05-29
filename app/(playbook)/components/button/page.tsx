import { ComponentDoc } from '@/components/docs/ComponentDoc'
import { TokenTable } from '@/components/docs/TokenTable'
import { CodeBlock } from '@/components/docs/CodeBlock'

const variantTokens = [
  { name: 'variant: primary', value: 'bg-accent text-accent-foreground hover:bg-accent/90', description: 'Acción principal de la pantalla' },
  { name: 'variant: secondary', value: 'bg-muted text-foreground hover:bg-muted/80', description: 'Acción alternativa' },
  { name: 'variant: outline', value: 'border border-border bg-transparent hover:bg-muted', description: 'Acción neutral' },
  { name: 'variant: ghost', value: 'bg-transparent hover:bg-muted', description: 'Acción terciaria discreta' },
  { name: 'variant: destructive', value: 'bg-destructive text-white hover:bg-destructive/90', description: 'Eliminar, cancelar irreversiblemente' },
  { name: 'size: sm', value: 'px-3 py-1.5 text-xs rounded-md', description: 'Botón compacto en tablas/cards' },
  { name: 'size: md', value: 'px-4 py-2 text-sm rounded-lg', description: 'Tamaño estándar' },
  { name: 'size: lg', value: 'px-6 py-3 text-base rounded-xl', description: 'CTAs hero, formularios principales' },
]

const componentCode = `// components/ui/Button.tsx
import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variants: Record<Variant, string> = {
  primary:     'bg-accent text-accent-foreground hover:bg-accent/90',
  secondary:   'bg-muted text-foreground hover:bg-muted/80',
  outline:     'border border-border bg-transparent hover:bg-muted text-foreground',
  ghost:       'bg-transparent hover:bg-muted text-foreground',
  destructive: 'bg-destructive text-white hover:bg-destructive/90',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  )
)`

const usageCode = `import { Button } from '@/components/ui/Button'

// Primario
<Button>Guardar cambios</Button>

// Secundario con tamaño
<Button variant="secondary" size="sm">Cancelar</Button>

// Destructivo con estado loading
<Button variant="destructive" loading={isDeleting}>
  Eliminar cuenta
</Button>

// Deshabilitado
<Button disabled>No disponible</Button>`

export default function ButtonPage() {
  return (
    <ComponentDoc
      name="Button"
      description="Elemento interactivo principal para disparar acciones. Extraído de HeroUI v2."
      tabs={[
        {
          id: 'design',
          label: 'Diseño',
          content: (
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Variantes</h2>
                <div className="flex flex-wrap gap-3 p-6 rounded-xl border border-border bg-card">
                  {[
                    { label: 'Primary', cls: 'bg-[hsl(221,83%,53%)] text-white hover:bg-[hsl(221,83%,48%)]' },
                    { label: 'Secondary', cls: 'bg-muted text-foreground hover:bg-muted/80' },
                    { label: 'Outline', cls: 'border border-border bg-transparent hover:bg-muted text-foreground' },
                    { label: 'Ghost', cls: 'bg-transparent hover:bg-muted text-foreground' },
                    { label: 'Destructive', cls: 'bg-[hsl(0,84%,60%)] text-white' },
                  ].map(v => (
                    <button key={v.label} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${v.cls}`}>
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Tamaños</h2>
                <div className="flex items-center gap-4 p-6 rounded-xl border border-border bg-card">
                  {[
                    { label: 'Small', cls: 'px-3 py-1.5 text-xs rounded-md' },
                    { label: 'Medium', cls: 'px-4 py-2 text-sm rounded-lg' },
                    { label: 'Large', cls: 'px-6 py-3 text-base rounded-xl' },
                  ].map(s => (
                    <button key={s.label} className={`bg-[hsl(221,83%,53%)] text-white font-medium transition-colors ${s.cls}`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Estados</h2>
                <div className="flex items-center gap-4 p-6 rounded-xl border border-border bg-card">
                  <button className="px-4 py-2 text-sm font-medium rounded-lg bg-[hsl(221,83%,53%)] text-white">Normal</button>
                  <button className="px-4 py-2 text-sm font-medium rounded-lg bg-[hsl(221,83%,48%)] text-white">Hover</button>
                  <button className="px-4 py-2 text-sm font-medium rounded-lg bg-[hsl(221,83%,53%)] text-white opacity-60 cursor-not-allowed" disabled>Disabled</button>
                  <button className="px-4 py-2 text-sm font-medium rounded-lg bg-[hsl(221,83%,53%)] text-white flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Loading
                  </button>
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
              <TokenTable tokens={variantTokens} title="Props y tokens" />
              <CodeBlock code={componentCode} language="tsx" filename="components/ui/Button.tsx" />
              <CodeBlock code={usageCode} language="tsx" filename="Uso" />
            </div>
          ),
        },
        {
          id: 'content',
          label: 'Contenido',
          content: (
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-foreground font-semibold">Microcopy de botones</h3>
              <div className="space-y-3">
                {[
                  { do: 'Guardar cambios', dont: 'Click aquí', note: 'Verbo + objeto específico' },
                  { do: 'Eliminar cuenta', dont: 'Eliminar', note: 'Especifica qué se elimina en acciones destructivas' },
                  { do: 'Ver detalles', dont: 'Más información', note: 'Verbos activos, sin artículos innecesarios' },
                  { do: 'Enviar solicitud', dont: 'Submit', note: 'Siempre en español, sin anglicismos' },
                ].map(item => (
                  <div key={item.do} className="flex gap-3 items-start">
                    <div className="flex flex-col gap-1 flex-1">
                      <span className="flex items-center gap-1.5 text-green-600 font-medium">
                        <span className="text-green-500">✓</span> {item.do}
                      </span>
                      <span className="flex items-center gap-1.5 text-destructive">
                        <span>✕</span> {item.dont}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground max-w-[160px] leading-relaxed mt-0.5">{item.note}</span>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
      ]}
    />
  )
}
