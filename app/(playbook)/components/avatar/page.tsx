import { ComponentDoc } from '@/components/docs/ComponentDoc'
import { TokenTable } from '@/components/docs/TokenTable'
import { CodeBlock } from '@/components/docs/CodeBlock'

const tokens = [
  { name: 'size-sm', value: 'w-7 h-7 text-xs', description: 'Tablas, listas compactas' },
  { name: 'size-md', value: 'w-9 h-9 text-sm', description: 'Header, menús (estándar)' },
  { name: 'size-lg', value: 'w-12 h-12 text-base', description: 'Cards de perfil' },
  { name: 'size-xl', value: 'w-16 h-16 text-lg', description: 'Páginas de perfil' },
  { name: 'fallback', value: 'bg-accent text-accent-foreground', description: 'Inicial cuando no hay imagen' },
  { name: 'border', value: 'ring-2 ring-background', description: 'Separación en grupos de avatars' },
]

const componentCode = `// components/ui/Avatar.tsx
import { cn } from '@/lib/utils'
import Image from 'next/image'

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  src?: string | null
  name?: string
  size?: AvatarSize
  className?: string
}

const sizes: Record<AvatarSize, string> = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const initials = name
    ?.split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className={cn('rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center font-bold bg-accent text-accent-foreground', sizes[size], className)}>
      {src ? (
        <Image src={src} alt={name ?? 'Avatar'} fill className="object-cover" />
      ) : (
        initials ?? '?'
      )}
    </div>
  )
}

// Grupo de avatars
export function AvatarGroup({ avatars, max = 4 }: { avatars: AvatarProps[]; max?: number }) {
  const visible = avatars.slice(0, max)
  const rest = avatars.length - max
  return (
    <div className="flex -space-x-2">
      {visible.map((a, i) => (
        <Avatar key={i} {...a} className="ring-2 ring-background" />
      ))}
      {rest > 0 && (
        <div className="w-9 h-9 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground">
          +{rest}
        </div>
      )}
    </div>
  )
}`

const usageCode = `import { Avatar, AvatarGroup } from '@/components/ui/Avatar'

// Avatar con imagen
<Avatar src="/foto.jpg" name="Juan García" size="lg" />

// Avatar sin imagen (usa iniciales)
<Avatar name="María López" size="md" />

// Grupo de avatars
<AvatarGroup
  max={4}
  avatars={[
    { name: 'Juan García' },
    { name: 'María López' },
    { name: 'Pedro Ruiz' },
    { name: 'Ana Torres' },
    { name: 'Luis Mora' },
  ]}
/>`

export default function AvatarPage() {
  return (
    <ComponentDoc
      name="Avatar"
      description="Representación visual del usuario. Muestra imagen o iniciales como fallback. Extraído de HeroUI v2."
      tabs={[
        {
          id: 'design',
          label: 'Diseño',
          content: (
            <div className="space-y-8">
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Tamaños</h2>
                <div className="flex items-end gap-6 p-6 rounded-xl border border-border bg-card">
                  {[
                    { size: 'w-7 h-7 text-xs', label: 'sm' },
                    { size: 'w-9 h-9 text-sm', label: 'md' },
                    { size: 'w-12 h-12 text-base', label: 'lg' },
                    { size: 'w-16 h-16 text-lg', label: 'xl' },
                  ].map(s => (
                    <div key={s.label} className="flex flex-col items-center gap-2">
                      <div className={`${s.size} rounded-full bg-[hsl(221,83%,53%)] text-white flex items-center justify-center font-bold flex-shrink-0`}>JG</div>
                      <span className="text-xs text-muted-foreground">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Grupo de avatars</h2>
                <div className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex -space-x-2">
                    {['JG', 'ML', 'PR', 'AT'].map((init, i) => (
                      <div key={i} className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white ring-2 ring-background flex-shrink-0`}
                        style={{ background: ['#2563eb','#7c3aed','#db2777','#059669'][i] }}>
                        {init}
                      </div>
                    ))}
                    <div className="w-9 h-9 rounded-full bg-muted ring-2 ring-background flex items-center justify-center text-xs font-medium text-muted-foreground">+3</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">5 colaboradores activos</p>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Con indicador de estado</h2>
                <div className="flex gap-4 p-6 rounded-xl border border-border bg-card">
                  {[
                    { cls: 'bg-green-500', label: 'Online' },
                    { cls: 'bg-yellow-500', label: 'Ausente' },
                    { cls: 'bg-gray-400', label: 'Offline' },
                  ].map(s => (
                    <div key={s.label} className="flex flex-col items-center gap-2">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-[hsl(221,83%,53%)] text-white flex items-center justify-center font-bold text-sm">JG</div>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${s.cls} ring-2 ring-background`} />
                      </div>
                      <span className="text-xs text-muted-foreground">{s.label}</span>
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
              <TokenTable tokens={tokens} title="Tokens" />
              <CodeBlock code={componentCode} language="tsx" filename="components/ui/Avatar.tsx" />
              <CodeBlock code={usageCode} language="tsx" filename="Uso" />
            </div>
          ),
        },
        {
          id: 'content',
          label: 'Contenido',
          content: (
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-foreground font-semibold">Texto alternativo</h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li>El <code className="text-accent bg-muted px-1 rounded">alt</code> debe ser el nombre completo del usuario.</li>
                <li>Si el avatar es decorativo (ya hay texto del nombre cerca), usa <code className="text-accent bg-muted px-1 rounded">alt=""</code>.</li>
                <li>Las iniciales del fallback deben generarse desde nombre + apellido (máx. 2 letras).</li>
              </ul>
            </div>
          ),
        },
      ]}
    />
  )
}
