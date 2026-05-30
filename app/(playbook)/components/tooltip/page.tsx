import { DocPage, SectionTitle, SubTitle, DocText, CodeInline } from '@/components/docs/DocPage'
import { Preview } from '@/components/docs/Preview'
import { DoDont, Do, Dont } from '@/components/docs/DoDont'
import { PropsTable } from '@/components/docs/PropsTable'
import { UsageRule } from '@/components/docs/UsageRule'
import { Callout } from '@/components/docs/Callout'
import { CodeBlock } from '@/components/docs/CodeBlock'

const FIGMA_URL = 'https://www.figma.com/design/0jMlITHtt6o1CYjjvepR0N/HeroUI-Figma-Kit--Community-?node-id=4281-261304&t=OjFe5BIgvZKQwgNQ-0'

const toc = [
  { id: 'uso-basico', label: 'Uso básico', level: 2 },
  { id: 'posiciones', label: 'Posiciones', level: 2 },
  { id: 'cuando-usarlo', label: 'Cuándo usarlo', level: 2 },
  { id: 'do-dont', label: "Do / Don't", level: 2 },
  { id: 'props', label: 'Props', level: 2 },
  { id: 'accesibilidad', label: 'Accesibilidad', level: 2 },
]

export default function TooltipPage() {
  return (
    <DocPage
      title="Tooltip"
      description="Etiqueta emergente que revela información complementaria al hacer hover sobre un elemento. Aparece tras 300ms para evitar activaciones accidentales."
      figmaUrl={FIGMA_URL}
      toc={toc}
    >
      <SectionTitle id="uso-basico">Uso básico</SectionTitle>
      <DocText>El caso más común: un botón de solo icono donde el tooltip aporta el contexto que el icono no comunica por sí solo.</DocText>
      <Preview code={`<Tooltip content="Copiar enlace">
  <button><Copy /></button>
</Tooltip>`}>
        <div className="relative flex flex-col items-center gap-2">
          <div className="bg-slate-900 text-white text-xs font-medium px-2 py-1 rounded-md shadow-md whitespace-nowrap">Copiar enlace</div>
          <button className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50">
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          </button>
        </div>
      </Preview>

      <SectionTitle id="posiciones">Posiciones</SectionTitle>
      <Preview code={`<Tooltip placement="top" /> <Tooltip placement="bottom" /> ...`}>
        <div className="grid grid-cols-2 gap-8">
          {[{ p: 'Top', n: 'por defecto' }, { p: 'Bottom', n: '' }, { p: 'Left', n: '' }, { p: 'Right', n: '' }].map(({ p, n }) => (
            <div key={p} className="flex flex-col items-center gap-2">
              <div className="bg-slate-900 text-white text-xs px-2 py-1 rounded-md">{p}</div>
              <button className="px-3 py-1.5 text-xs border border-slate-200 rounded-md text-slate-600 bg-white">{p} {n && <span className="text-slate-400">({n})</span>}</button>
            </div>
          ))}
        </div>
      </Preview>

      <SectionTitle id="cuando-usarlo">Cuándo usarlo</SectionTitle>
      <UsageRule
        useWhen={[
          'Botones o iconos sin texto visible — el tooltip es su label',
          'Abreviaturas o términos técnicos que necesitan explicación',
          'Acciones cuyo efecto no es evidente por el contexto',
          'Información secundaria que no justifica espacio permanente',
        ]}
        avoidWhen={[
          'Para información crítica necesaria para tomar una decisión',
          'En táctil como única forma de revelar información (no hay hover)',
          'Para textos largos — el tooltip es para etiquetas cortas',
          'Cuando el elemento ya tiene un label visible claro',
        ]}
      />
      <Callout type="warning" title="No es un sustituto del label">
        Si el usuario necesita leer el tooltip para entender un botón, el problema es el diseño. Revisa si el botón necesita texto visible.
      </Callout>

      <SectionTitle id="do-dont">Do / Don&apos;t</SectionTitle>
      <DoDont description="El texto del tooltip es una etiqueta corta, no una frase. Sin puntuación al final.">
        <Do label="Etiqueta corta y directa">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-slate-900 text-white text-xs px-2 py-1 rounded-md">Eliminar fila</div>
            <button className="p-2 rounded border border-slate-200">🗑️</button>
          </div>
        </Do>
        <Dont label="Frase larga con puntuación">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-slate-900 text-white text-xs px-2 py-1 rounded-md max-w-40 text-center leading-tight">Haz clic aquí para eliminar esta fila de la tabla.</div>
            <button className="p-2 rounded border border-slate-200">🗑️</button>
          </div>
        </Dont>
      </DoDont>

      <SectionTitle id="props">Props</SectionTitle>
      <PropsTable items={[
        { name: 'content', type: 'string', required: true, description: 'Texto del tooltip. Máx. 4-5 palabras, sin puntuación final.' },
        { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Posición relativa al elemento.' },
        { name: 'children', type: 'ReactNode', required: true, description: 'Elemento sobre el que aparece el tooltip al hacer hover.' },
      ]} />

      <SectionTitle id="accesibilidad">Accesibilidad</SectionTitle>
      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground my-3">
        <li>El tooltip se asocia con <CodeInline>role=&quot;tooltip&quot;</CodeInline> y <CodeInline>aria-describedby</CodeInline>.</li>
        <li>Los iconos sin texto deben tener <CodeInline>aria-label</CodeInline> además del tooltip visual.</li>
        <li>No debe ser la única forma de comunicar información en dispositivos táctiles.</li>
      </ul>

      <CodeBlock
        filename="components/ui/Tooltip.tsx"
        language="tsx"
        code={`'use client'
import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'

export function Tooltip({ content, placement = 'top', children }: {
  content: string; placement?: 'top' | 'bottom' | 'left' | 'right'; children: React.ReactNode
}) {
  const [visible, setVisible] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const show = () => { timer.current = setTimeout(() => setVisible(true), 300) }
  const hide = () => { clearTimeout(timer.current); setVisible(false) }

  const pos = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-1.5',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5',
    left: 'right-full top-1/2 -translate-y-1/2 mr-1.5',
    right: 'left-full top-1/2 -translate-y-1/2 ml-1.5',
  }
  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {visible && (
        <div role="tooltip" className={cn('absolute z-50 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap bg-foreground text-background shadow-md', pos[placement])}>
          {content}
        </div>
      )}
    </div>
  )
}`}
      />
    </DocPage>
  )
}
