import { DocPage, SectionTitle, SubTitle, DocText, CodeInline } from '@/components/docs/DocPage'
import { Preview } from '@/components/docs/Preview'
import { DoDont, Do, Dont } from '@/components/docs/DoDont'
import { PropsTable } from '@/components/docs/PropsTable'
import { UsageRule } from '@/components/docs/UsageRule'
import { Callout } from '@/components/docs/Callout'
import { CodeBlock } from '@/components/docs/CodeBlock'

const FIGMA_URL = 'https://www.figma.com/design/0jMlITHtt6o1CYjjvepR0N/HeroUI-Figma-Kit--Community-?node-id=4281-261282&t=OjFe5BIgvZKQwgNQ-0'

const toc = [
  { id: 'uso-basico', label: 'Uso básico', level: 2 },
  { id: 'variantes', label: 'Variantes', level: 2 },
  { id: 'anatomia', label: 'Anatomía', level: 2 },
  { id: 'cuando-usarlo', label: 'Cuándo usarlo', level: 2 },
  { id: 'do-dont', label: "Do / Don't", level: 2 },
  { id: 'props', label: 'Props', level: 2 },
  { id: 'accesibilidad', label: 'Accesibilidad', level: 2 },
]

export default function CardPage() {
  return (
    <DocPage
      title="Card"
      description="Contenedor que agrupa información relacionada en una superficie elevada. Es uno de los patrones más versátiles del sistema: base de listados, perfiles, dashboards y formularios en contexto."
      figmaUrl={FIGMA_URL}
      toc={toc}
    >
      <SectionTitle id="uso-basico">Uso básico</SectionTitle>
      <DocText>Una card básica agrupa un título y su contenido en una superficie con borde y radio definidos.</DocText>
      <Preview code={`<Card>
  <CardTitle>Título de la card</CardTitle>
  <CardContent>Contenido descriptivo.</CardContent>
</Card>`}>
        <div className="bg-white border border-slate-200 rounded-xl p-5 w-72 shadow-sm">
          <p className="font-semibold text-slate-900 text-sm">Título de la card</p>
          <p className="text-slate-500 text-sm mt-1">Contenido descriptivo que complementa el título.</p>
        </div>
      </Preview>

      <SectionTitle id="variantes">Variantes</SectionTitle>
      <SubTitle>Card básica</SubTitle>
      <Preview>
        <div className="bg-white border border-slate-200 rounded-xl p-5 w-64 shadow-sm">
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">Categoría</p>
          <p className="font-semibold text-slate-900 text-sm">Título del elemento</p>
          <p className="text-slate-500 text-xs mt-1">Descripción breve que complementa el título.</p>
        </div>
      </Preview>

      <SubTitle>Card interactiva</SubTitle>
      <DocText>Añade <CodeInline>interactive</CodeInline> cuando toda la card es clickable. Aparece hover state y cursor pointer.</DocText>
      <Preview>
        <div className="bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md rounded-xl p-5 w-64 shadow-sm transition-all cursor-pointer">
          <p className="font-semibold text-slate-900 text-sm">Card clickable</p>
          <p className="text-slate-500 text-xs mt-1">Pasa el cursor para ver el hover.</p>
        </div>
      </Preview>

      <SubTitle>Card con footer de acciones</SubTitle>
      <Preview>
        <div className="bg-white border border-slate-200 rounded-xl w-64 shadow-sm overflow-hidden">
          <div className="p-5">
            <p className="font-semibold text-slate-900 text-sm">Confirmar acción</p>
            <p className="text-slate-500 text-xs mt-1">Esta acción afecta a todos los usuarios del equipo.</p>
          </div>
          <div className="flex gap-2 px-5 py-3 border-t border-slate-100">
            <button className="px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 text-slate-600">Cancelar</button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white">Confirmar</button>
          </div>
        </div>
      </Preview>

      <SectionTitle id="anatomia">Anatomía</SectionTitle>
      <div className="my-5 space-y-2">
        {[
          { n: '1', name: 'Header', desc: 'Opcional. Título + acción secundaria (icono).' },
          { n: '2', name: 'Media', desc: 'Opcional. Imagen o ilustración destacada.' },
          { n: '3', name: 'Body', desc: 'Contenido principal de la card.' },
          { n: '4', name: 'Footer', desc: 'Opcional. Acciones en orden de prioridad (máx. 2).' },
        ].map(({ n, name, desc }) => (
          <div key={n} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
            <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0">{n}</span>
            <span className="text-sm font-medium text-foreground w-20">{name}</span>
            <span className="text-xs text-muted-foreground">{desc}</span>
          </div>
        ))}
      </div>

      <SectionTitle id="cuando-usarlo">Cuándo usarlo</SectionTitle>
      <UsageRule
        useWhen={[
          'Agrupar información relacionada que debe destacar del fondo',
          'Mostrar ítems de una lista donde cada uno tiene igual importancia',
          'Contenido con múltiples atributos (imagen, título, descripción, acciones)',
          'Cuando el usuario necesita comparar varios elementos entre sí',
        ]}
        avoidWhen={[
          'Para envolver toda la página — la card es un elemento, no el layout',
          'Anidar cards dentro de cards — crea confusión visual',
          'Para contenido simple de una línea — usa una lista o tabla',
          'Cuando no hay acciones ni navegación asociada al contenido',
        ]}
      />

      <SectionTitle id="do-dont">Do / Don&apos;t</SectionTitle>
      <DoDont description="El título de una card debe leerse de forma independiente, sin necesitar el cuerpo para entenderse.">
        <Do label="Título autosuficiente">
          <div className="bg-white border border-slate-200 rounded-xl p-4 w-52 shadow-sm text-left">
            <p className="font-semibold text-slate-900 text-xs">Plan Pro — 29€/mes</p>
            <p className="text-slate-500 text-xs mt-1">Hasta 10 usuarios, soporte prioritario.</p>
          </div>
        </Do>
        <Dont label="Título que depende del cuerpo">
          <div className="bg-white border border-slate-200 rounded-xl p-4 w-52 shadow-sm text-left">
            <p className="font-semibold text-slate-900 text-xs">Este plan incluye...</p>
            <p className="text-slate-500 text-xs mt-1">Hasta 10 usuarios, soporte prioritario.</p>
          </div>
        </Dont>
      </DoDont>

      <DoDont description="Limita el footer a un máximo de dos acciones para no sobrecargar la decisión del usuario.">
        <Do label="Máximo 2 acciones">
          <div className="bg-white border border-slate-200 rounded-xl w-52 shadow-sm overflow-hidden">
            <div className="p-4"><p className="text-xs text-slate-500">Contenido</p></div>
            <div className="flex gap-2 px-4 py-3 border-t border-slate-100">
              <button className="px-2 py-1 text-xs border border-slate-200 rounded text-slate-600">Cancelar</button>
              <button className="px-2 py-1 text-xs bg-blue-600 text-white rounded">Confirmar</button>
            </div>
          </div>
        </Do>
        <Dont label="Demasiadas acciones">
          <div className="bg-white border border-slate-200 rounded-xl w-52 shadow-sm overflow-hidden">
            <div className="p-4"><p className="text-xs text-slate-500">Contenido</p></div>
            <div className="flex gap-1 px-4 py-3 border-t border-slate-100 flex-wrap">
              <button className="px-2 py-1 text-xs border border-slate-200 rounded text-slate-600">Ver</button>
              <button className="px-2 py-1 text-xs border border-slate-200 rounded text-slate-600">Editar</button>
              <button className="px-2 py-1 text-xs border border-slate-200 rounded text-slate-600">Compartir</button>
              <button className="px-2 py-1 text-xs bg-blue-600 text-white rounded">Guardar</button>
            </div>
          </div>
        </Dont>
      </DoDont>

      <SectionTitle id="props">Props</SectionTitle>
      <PropsTable items={[
        { name: 'interactive', type: 'boolean', default: 'false', description: 'Activa hover state y cursor pointer. Para cards completamente clickables.' },
        { name: 'className', type: 'string', description: 'Clases adicionales para personalización puntual.' },
        { name: 'children', type: 'ReactNode', required: true, description: 'Contenido de la card (CardHeader, CardContent, CardFooter).' },
      ]} />

      <SectionTitle id="accesibilidad">Accesibilidad</SectionTitle>
      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground my-3">
        <li>Las cards interactivas deben ser <CodeInline>&lt;a&gt;</CodeInline> o <CodeInline>&lt;button&gt;</CodeInline>, no <CodeInline>&lt;div&gt;</CodeInline> con onClick.</li>
        <li>Si hay un botón &quot;Ver más&quot;, el texto debe ser descriptivo: &quot;Ver más sobre Plan Pro&quot;.</li>
        <li>En grids de cards usa <CodeInline>role=&quot;list&quot;</CodeInline> en el contenedor y <CodeInline>role=&quot;listitem&quot;</CodeInline> en cada card.</li>
      </ul>

      <CodeBlock
        filename="components/ui/Card.tsx"
        language="tsx"
        code={`import { cn } from '@/lib/utils'

export function Card({ className, children, interactive }: {
  className?: string; children: React.ReactNode; interactive?: boolean
}) {
  return (
    <div className={cn(
      'bg-card border border-border rounded-xl p-5',
      interactive && 'hover:border-accent/50 hover:shadow-md transition-all cursor-pointer',
      className,
    )}>
      {children}
    </div>
  )
}

export const CardTitle = ({ children }: { children: React.ReactNode }) =>
  <h3 className="text-base font-semibold text-foreground">{children}</h3>

export const CardContent = ({ children }: { children: React.ReactNode }) =>
  <div className="text-sm text-muted-foreground">{children}</div>

export const CardFooter = ({ children }: { children: React.ReactNode }) =>
  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">{children}</div>`}
      />
    </DocPage>
  )
}
