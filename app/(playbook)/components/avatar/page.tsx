import { DocPage, SectionTitle, SubTitle, DocText, CodeInline } from '@/components/docs/DocPage'
import { Preview } from '@/components/docs/Preview'
import { DoDont, Do, Dont } from '@/components/docs/DoDont'
import { PropsTable } from '@/components/docs/PropsTable'
import { UsageRule } from '@/components/docs/UsageRule'
import { CodeBlock } from '@/components/docs/CodeBlock'

const FIGMA_URL = 'https://www.figma.com/design/0jMlITHtt6o1CYjjvepR0N/HeroUI-Figma-Kit--Community-?node-id=4281-261312&t=OjFe5BIgvZKQwgNQ-0'

const toc = [
  { id: 'uso-basico', label: 'Uso básico', level: 2 },
  { id: 'tamanos', label: 'Tamaños', level: 2 },
  { id: 'estado', label: 'Indicador de estado', level: 2 },
  { id: 'grupo', label: 'Grupo de avatars', level: 2 },
  { id: 'cuando-usarlo', label: 'Cuándo usarlo', level: 2 },
  { id: 'do-dont', label: "Do / Don't", level: 2 },
  { id: 'props', label: 'Props', level: 2 },
  { id: 'accesibilidad', label: 'Accesibilidad', level: 2 },
]

function Av({ size = 'w-10 h-10 text-sm', color = '#2563eb', initials = 'CM' }: { size?: string; color?: string; initials?: string }) {
  return <div className={`${size} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`} style={{ background: color }}>{initials}</div>
}

export default function AvatarPage() {
  return (
    <DocPage
      title="Avatar"
      description="Representación visual compacta de un usuario o entidad. Muestra una foto cuando está disponible, o las iniciales del nombre como fallback."
      figmaUrl={FIGMA_URL}
      toc={toc}
    >
      <SectionTitle id="uso-basico">Uso básico</SectionTitle>
      <DocText>Cuando no hay imagen, el avatar genera las iniciales a partir del nombre completo.</DocText>
      <Preview code={`<Avatar name="Chus Molina" size="md" />`}>
        <Av />
      </Preview>

      <SectionTitle id="tamanos">Tamaños</SectionTitle>
      <Preview code={`<Avatar size="sm" /> <Avatar size="md" /> <Avatar size="lg" /> <Avatar size="xl" />`}>
        <div className="flex items-end gap-6">
          {[
            { s: 'w-7 h-7 text-xs', l: 'sm · 28px' },
            { s: 'w-9 h-9 text-sm', l: 'md · 36px' },
            { s: 'w-12 h-12 text-base', l: 'lg · 48px' },
            { s: 'w-16 h-16 text-lg', l: 'xl · 64px' },
          ].map(({ s, l }) => (
            <div key={l} className="flex flex-col items-center gap-2">
              <Av size={s} />
              <span className="text-xs text-slate-400">{l}</span>
            </div>
          ))}
        </div>
      </Preview>

      <SectionTitle id="estado">Indicador de estado</SectionTitle>
      <Preview>
        <div className="flex gap-6">
          {[
            { c: 'bg-green-500', l: 'Online' },
            { c: 'bg-yellow-500', l: 'Ausente' },
            { c: 'bg-slate-400', l: 'Offline' },
          ].map(({ c, l }) => (
            <div key={l} className="flex flex-col items-center gap-2">
              <div className="relative">
                <Av />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${c} ring-2 ring-white`} />
              </div>
              <span className="text-xs text-slate-400">{l}</span>
            </div>
          ))}
        </div>
      </Preview>

      <SectionTitle id="grupo">Grupo de avatars</SectionTitle>
      <DocText>Para mostrar varios usuarios, apila los avatars con solapamiento y un contador <CodeInline>+N</CodeInline> a partir del máximo definido.</DocText>
      <Preview code={`<AvatarGroup avatars={users} max={4} />`}>
        <div className="flex -space-x-2">
          {['#2563eb', '#7c3aed', '#db2777', '#059669'].map((c, i) => (
            <div key={i} className="w-9 h-9 rounded-full ring-2 ring-white flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style={{ background: c }}>
              {['JG', 'ML', 'PR', 'AT'][i]}
            </div>
          ))}
          <div className="w-9 h-9 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-500">+3</div>
        </div>
      </Preview>

      <SectionTitle id="cuando-usarlo">Cuándo usarlo</SectionTitle>
      <UsageRule
        useWhen={[
          'Identificar al autor de un contenido (post, comentario, tarea)',
          'Mostrar los miembros asignados a un proyecto o tarea',
          'Header de la app para indicar la sesión activa',
          'En listas o tablas donde la foto humaniza el contenido',
        ]}
        avoidWhen={[
          'Cuando no hay usuario real asociado — no es decoración',
          'Para representar entidades no-persona (usa un icono)',
          'En grupos de más de 5 sin contador — muestra máx. 4 y +N',
        ]}
      />

      <SectionTitle id="do-dont">Do / Don&apos;t</SectionTitle>
      <DoDont description="Las iniciales del fallback se forman con la primera letra del nombre y la del apellido.">
        <Do label="Iniciales nombre + apellido">
          <div className="flex gap-2">
            <Av color="#2563eb" initials="CM" />
            <Av color="#7c3aed" initials="JG" />
          </div>
        </Do>
        <Dont label="Una sola inicial o nombre completo">
          <div className="flex gap-2">
            <Av color="#94a3b8" initials="C" />
            <div className="w-10 h-10 rounded-full bg-slate-400 flex items-center justify-center text-white font-bold text-xs">Chus</div>
          </div>
        </Dont>
      </DoDont>

      <SectionTitle id="props">Props</SectionTitle>
      <PropsTable items={[
        { name: 'src', type: 'string | null', description: 'URL de la imagen. Si es null, muestra las iniciales.' },
        { name: 'name', type: 'string', required: true, description: 'Nombre completo. Genera las iniciales y el alt de la imagen.' },
        { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Tamaño: sm=28px, md=36px, lg=48px, xl=64px.' },
        { name: 'className', type: 'string', description: 'Clases adicionales.' },
      ]} />

      <SectionTitle id="accesibilidad">Accesibilidad</SectionTitle>
      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground my-3">
        <li>La imagen debe tener <CodeInline>alt</CodeInline> con el nombre completo del usuario.</li>
        <li>Si el avatar aparece junto al nombre escrito, usa <CodeInline>alt=&quot;&quot;</CodeInline> para evitar repetición.</li>
        <li>Los indicadores de estado necesitan texto: <CodeInline>aria-label=&quot;Juan García — Online&quot;</CodeInline>.</li>
      </ul>

      <CodeBlock
        filename="components/ui/Avatar.tsx"
        language="tsx"
        code={`import { cn } from '@/lib/utils'
import Image from 'next/image'

const sizes = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-lg' }

export function Avatar({ src, name, size = 'md', className }: {
  src?: string | null; name?: string; size?: keyof typeof sizes; className?: string
}) {
  const initials = name?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div className={cn('rounded-full overflow-hidden flex items-center justify-center font-bold bg-accent text-accent-foreground', sizes[size], className)}>
      {src ? <Image src={src} alt={name ?? ''} fill className="object-cover" /> : (initials ?? '?')}
    </div>
  )
}`}
      />
    </DocPage>
  )
}
