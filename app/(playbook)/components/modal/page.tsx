import { DocPage, SectionTitle, SubTitle, DocText, CodeInline } from '@/components/docs/DocPage'
import { Preview } from '@/components/docs/Preview'
import { DoDont, Do, Dont } from '@/components/docs/DoDont'
import { PropsTable } from '@/components/docs/PropsTable'
import { UsageRule } from '@/components/docs/UsageRule'
import { Callout } from '@/components/docs/Callout'
import { CodeBlock } from '@/components/docs/CodeBlock'

const FIGMA_URL = 'https://www.figma.com/design/0jMlITHtt6o1CYjjvepR0N/HeroUI-Figma-Kit--Community-?node-id=4281-261299&t=OjFe5BIgvZKQwgNQ-0'

const toc = [
  { id: 'uso-basico', label: 'Uso básico', level: 2 },
  { id: 'tipos', label: 'Tipos de modal', level: 2 },
  { id: 'cuando-usarlo', label: 'Cuándo usarlo', level: 2 },
  { id: 'do-dont', label: "Do / Don't", level: 2 },
  { id: 'props', label: 'Props', level: 2 },
  { id: 'accesibilidad', label: 'Accesibilidad', level: 2 },
]

function ModalDemo() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xl w-80 text-left">
      <div className="flex items-center justify-between p-5 border-b border-slate-100">
        <div>
          <p className="font-semibold text-slate-900 text-sm">¿Eliminar proyecto?</p>
          <p className="text-slate-500 text-xs mt-0.5">Esta acción no se puede deshacer.</p>
        </div>
        <button className="text-slate-400 hover:text-slate-600 text-lg leading-none">✕</button>
      </div>
      <div className="p-5">
        <p className="text-slate-500 text-sm">Se eliminarán todos los datos del proyecto permanentemente.</p>
      </div>
      <div className="flex gap-2 justify-end px-5 pb-5">
        <button className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 text-slate-700">Cancelar</button>
        <button className="px-4 py-2 text-xs font-medium rounded-lg bg-red-500 text-white">Sí, eliminar</button>
      </div>
    </div>
  )
}

export default function ModalPage() {
  return (
    <DocPage
      title="Modal"
      description="Diálogo superpuesto que interrumpe el flujo para requerir una decisión o mostrar información crítica. Tiene un coste de fricción alto — úsalo con moderación."
      figmaUrl={FIGMA_URL}
      toc={toc}
    >
      <SectionTitle id="uso-basico">Uso básico</SectionTitle>
      <DocText>El modal aparece sobre un overlay oscuro. En producción se centra en pantalla; aquí se muestra el panel aislado.</DocText>
      <Preview>
        <ModalDemo />
      </Preview>

      <SectionTitle id="tipos">Tipos de modal</SectionTitle>
      <div className="my-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { title: 'Confirmación', desc: 'Acción irreversible que requiere confirmación explícita. El título es una pregunta.' },
          { title: 'Formulario', desc: 'Captura datos en contexto sin abandonar la página actual.' },
          { title: 'Información', desc: 'Muestra el detalle de un elemento sin navegación nueva.' },
        ].map(t => (
          <div key={t.title} className="p-4 rounded-xl border border-border bg-card">
            <p className="font-medium text-sm text-foreground">{t.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
          </div>
        ))}
      </div>
      <Callout type="danger" title="Solo para lo que importa">
        El modal interrumpe al usuario. Resérvalo para acciones irreversibles o información que no puede esperar. Para confirmaciones reversibles usa un toast.
      </Callout>

      <SectionTitle id="cuando-usarlo">Cuándo usarlo</SectionTitle>
      <UsageRule
        useWhen={[
          'La acción es irreversible y necesita confirmación (eliminar, cancelar suscripción)',
          'Un formulario corto (máx. 4-5 campos) que no justifica una página',
          'Mostrar el detalle de un ítem de tabla sin perder contexto',
          'Mensajes de error críticos que requieren atención inmediata',
        ]}
        avoidWhen={[
          'Para confirmaciones reversibles — usa un toast o inline feedback',
          'Formularios largos — usa una página dedicada',
          'Información de consulta frecuente — ponla visible en la UI',
          'Apilar modales — nunca abras un modal desde otro modal',
        ]}
      />

      <SectionTitle id="do-dont">Do / Don&apos;t</SectionTitle>
      <DoDont description="El botón de acción principal repite exactamente la acción descrita en el título.">
        <Do label="Botón que confirma la acción específica">
          <div className="bg-white border border-slate-200 rounded-xl w-56 shadow-sm overflow-hidden text-left">
            <div className="p-3 border-b border-slate-100"><p className="text-xs font-semibold text-slate-900">¿Cerrar sesión?</p></div>
            <div className="flex gap-2 p-3 justify-end">
              <button className="px-2 py-1 text-xs border border-slate-200 rounded text-slate-600">Cancelar</button>
              <button className="px-2 py-1 text-xs bg-blue-600 text-white rounded">Cerrar sesión</button>
            </div>
          </div>
        </Do>
        <Dont label="Botones genéricos Sí / No">
          <div className="bg-white border border-slate-200 rounded-xl w-56 shadow-sm overflow-hidden text-left">
            <div className="p-3 border-b border-slate-100"><p className="text-xs font-semibold text-slate-900">¿Cerrar sesión?</p></div>
            <div className="flex gap-2 p-3 justify-end">
              <button className="px-2 py-1 text-xs border border-slate-200 rounded text-slate-600">No</button>
              <button className="px-2 py-1 text-xs bg-blue-600 text-white rounded">Sí</button>
            </div>
          </div>
        </Dont>
      </DoDont>

      <SectionTitle id="props">Props</SectionTitle>
      <PropsTable items={[
        { name: 'open', type: 'boolean', required: true, description: 'Controla si el modal está visible.' },
        { name: 'onClose', type: '() => void', required: true, description: 'Se ejecuta al cerrar (Escape, click en overlay, botón ✕).' },
        { name: 'title', type: 'string', description: 'Título. Pregunta para confirmaciones, verbo+objeto para formularios.' },
        { name: 'description', type: 'string', description: 'Subtítulo descriptivo que complementa el título.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Ancho máximo: sm=384px, md=448px, lg=512px.' },
      ]} />

      <SectionTitle id="accesibilidad">Accesibilidad</SectionTitle>
      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground my-3">
        <li>Debe tener <CodeInline>role=&quot;dialog&quot;</CodeInline> y <CodeInline>aria-modal=&quot;true&quot;</CodeInline>.</li>
        <li>El foco queda atrapado dentro del modal mientras está abierto.</li>
        <li>Al cerrarse, el foco vuelve al elemento que lo abrió.</li>
        <li>La tecla <CodeInline>Escape</CodeInline> siempre cierra el modal.</li>
      </ul>

      <CodeBlock
        filename="components/ui/Modal.tsx"
        language="tsx"
        code={`'use client'
import { useEffect } from 'react'
import { X } from 'lucide-react'

export function Modal({ open, onClose, title, description, children }: {
  open: boolean; onClose: () => void; title?: string; description?: string; children: React.ReactNode
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null
  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
        <div role="dialog" aria-modal className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-md pointer-events-auto" onClick={e => e.stopPropagation()}>
          {title && (
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <h2 className="text-base font-semibold text-foreground">{title}</h2>
                {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  )
}`}
      />
    </DocPage>
  )
}
