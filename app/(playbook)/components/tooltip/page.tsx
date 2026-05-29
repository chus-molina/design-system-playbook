import { ComponentDoc } from '@/components/docs/ComponentDoc'
import { TokenTable } from '@/components/docs/TokenTable'
import { CodeBlock } from '@/components/docs/CodeBlock'

const tokens = [
  { name: 'bg', value: 'bg-foreground text-background', description: 'Fondo oscuro por defecto' },
  { name: 'radius', value: 'rounded-md', description: 'Esquinas del tooltip' },
  { name: 'padding', value: 'px-2 py-1', description: 'Padding mínimo' },
  { name: 'font', value: 'text-xs font-medium', description: 'Tipografía pequeña y compacta' },
  { name: 'shadow', value: 'shadow-md', description: 'Elevación para separarse del fondo' },
  { name: 'delay', value: '300ms', description: 'Delay de aparición para evitar flickers' },
]

const componentCode = `'use client'
import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'

type Placement = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  content: string
  placement?: Placement
  children: React.ReactNode
}

export function Tooltip({ content, placement = 'top', children }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const show = () => { timer.current = setTimeout(() => setVisible(true), 300) }
  const hide = () => { clearTimeout(timer.current); setVisible(false) }

  const positions: Record<Placement, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-1.5',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5',
    left: 'right-full top-1/2 -translate-y-1/2 mr-1.5',
    right: 'left-full top-1/2 -translate-y-1/2 ml-1.5',
  }

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            'absolute z-50 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap',
            'bg-foreground text-background shadow-md',
            positions[placement],
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}`

const usageCode = `import { Tooltip } from '@/components/ui/Tooltip'

// Tooltip básico (arriba por defecto)
<Tooltip content="Copiar al portapapeles">
  <button><Copy className="w-4 h-4" /></button>
</Tooltip>

// Con posición diferente
<Tooltip content="Eliminar elemento" placement="bottom">
  <button><Trash2 className="w-4 h-4 text-destructive" /></button>
</Tooltip>`

export default function TooltipPage() {
  return (
    <ComponentDoc
      name="Tooltip"
      description="Etiqueta emergente que muestra información adicional sobre un elemento al hacer hover. Extraído de HeroUI v2."
      tabs={[
        {
          id: 'design',
          label: 'Diseño',
          content: (
            <div className="space-y-6">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Posiciones</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Top (por defecto)', pos: 'abajo del tooltip' },
                  { label: 'Bottom', pos: 'arriba del tooltip' },
                  { label: 'Left', pos: 'a la derecha' },
                  { label: 'Right', pos: 'a la izquierda' },
                ].map(p => (
                  <div key={p.label} className="p-4 rounded-xl border border-border bg-card flex flex-col items-center gap-3">
                    <div className="bg-foreground text-background text-xs font-medium px-2 py-1 rounded-md shadow-md">
                      Etiqueta tooltip
                    </div>
                    <button className="px-3 py-1.5 text-xs border border-border rounded-md text-foreground bg-muted">
                      Elemento
                    </button>
                    <span className="text-xs text-muted-foreground">{p.label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Caso de uso típico</h2>
                <div className="p-5 rounded-xl border border-border bg-card flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-medium px-2 py-1 rounded-md shadow-md whitespace-nowrap">
                      Configuración del proyecto
                    </div>
                    <button className="p-2 rounded-lg border border-border hover:bg-muted">
                      ⚙️
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">Iconos sin texto visible requieren tooltip.</p>
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
              <TokenTable tokens={tokens} title="Tokens del tooltip" />
              <CodeBlock code={componentCode} language="tsx" filename="components/ui/Tooltip.tsx" />
              <CodeBlock code={usageCode} language="tsx" filename="Uso" />
            </div>
          ),
        },
        {
          id: 'content',
          label: 'Contenido',
          content: (
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-foreground font-semibold">Cuándo usar tooltip</h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li>Para iconos sin texto visible — el tooltip es su accesibilidad.</li>
                <li>Para botones que necesitan contexto adicional sin sobrecargar la UI.</li>
                <li>NO para información crítica — si el usuario necesita leerlo para actuar, ponlo en el UI principal.</li>
              </ul>
              <h3 className="text-foreground font-semibold mt-4">Texto del tooltip</h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li>Máximo 4-5 palabras — debe ser instantáneamente legible.</li>
                <li>Sin puntuación al final — no es una frase, es una etiqueta.</li>
                <li>Verbo + objeto: "Copiar enlace", "Eliminar fila", "Abrir menú".</li>
              </ul>
            </div>
          ),
        },
      ]}
    />
  )
}
