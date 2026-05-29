import { ComponentDoc } from '@/components/docs/ComponentDoc'
import { TokenTable } from '@/components/docs/TokenTable'
import { CodeBlock } from '@/components/docs/CodeBlock'

const tokens = [
  { name: 'bg', value: 'bg-card', description: 'Fondo de la card' },
  { name: 'border', value: 'border border-border', description: 'Borde sutil' },
  { name: 'radius', value: 'rounded-xl', description: 'Radio de esquinas (12px)' },
  { name: 'shadow', value: 'shadow-sm', description: 'Elevación mínima' },
  { name: 'padding', value: 'p-5 o p-4', description: 'Padding interno' },
  { name: 'hover', value: 'hover:border-accent/50 hover:shadow-md', description: 'Estado interactivo' },
]

const componentCode = `// components/ui/Card.tsx
import { cn } from '@/lib/utils'

interface CardProps {
  className?: string
  children: React.ReactNode
  interactive?: boolean
}

export function Card({ className, children, interactive }: CardProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-xl p-5',
        interactive && 'hover:border-accent/50 hover:shadow-md transition-all cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('flex items-start justify-between mb-4', className)}>{children}</div>
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={cn('text-base font-semibold text-foreground', className)}>{children}</h3>
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('text-sm text-muted-foreground', className)}>{children}</div>
}

export function CardFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('flex items-center gap-2 mt-4 pt-4 border-t border-border', className)}>{children}</div>
}`

const usageCode = `import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'

// Card básica
<Card>
  <CardHeader>
    <CardTitle>Nombre del componente</CardTitle>
  </CardHeader>
  <CardContent>
    Descripción o contenido de la card.
  </CardContent>
</Card>

// Card interactiva (clickable)
<Card interactive>
  <CardTitle>Ver detalles</CardTitle>
</Card>`

export default function CardPage() {
  return (
    <ComponentDoc
      name="Card"
      description="Contenedor para agrupar contenido relacionado. Base de muchos patrones de la UI."
      tabs={[
        {
          id: 'design',
          label: 'Diseño',
          content: (
            <div className="space-y-6">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Variantes visuales</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-xl p-5">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Card básica</p>
                  <h3 className="font-semibold text-foreground">Título de la card</h3>
                  <p className="text-sm text-muted-foreground mt-1">Contenido descriptivo que explica el elemento.</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-5 hover:border-[hsl(221,83%,53%)]/50 hover:shadow-md transition-all">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Card interactiva</p>
                  <h3 className="font-semibold text-foreground">Card clickable</h3>
                  <p className="text-sm text-muted-foreground mt-1">Hover para ver el estado activo.</p>
                </div>

                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="h-24 bg-gradient-to-br from-accent/20 to-accent/40" />
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">Card con imagen</h3>
                    <p className="text-sm text-muted-foreground mt-1">Componente visual destacado.</p>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-lg">👤</div>
                    <div>
                      <p className="font-medium text-foreground text-sm">Usuario Ejemplo</p>
                      <p className="text-xs text-muted-foreground">@usuario</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Card de perfil de usuario con avatar.</p>
                  <div className="flex gap-4 mt-4 pt-4 border-t border-border text-sm">
                    <div><strong className="text-foreground">12</strong> <span className="text-muted-foreground">Posts</span></div>
                    <div><strong className="text-foreground">340</strong> <span className="text-muted-foreground">Seguidores</span></div>
                  </div>
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
              <TokenTable tokens={tokens} title="Tokens de la card" />
              <CodeBlock code={componentCode} language="tsx" filename="components/ui/Card.tsx" />
              <CodeBlock code={usageCode} language="tsx" filename="Uso" />
            </div>
          ),
        },
        {
          id: 'content',
          label: 'Contenido',
          content: (
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-foreground font-semibold">Principios de contenido en cards</h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li>El título debe ser autosuficiente — comprensible sin leer el cuerpo.</li>
                <li>El cuerpo no repite el título, lo complementa o expande.</li>
                <li>El footer muestra acciones en orden de prioridad (izquierda = primaria).</li>
                <li>Las cards interactivas deben tener un destino claro — no uses cards clickables sin link.</li>
              </ul>
            </div>
          ),
        },
      ]}
    />
  )
}
