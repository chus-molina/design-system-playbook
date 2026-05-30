import { DocPage, SectionTitle, SubTitle, DocText, CodeInline } from '@/components/docs/DocPage'
import { Preview } from '@/components/docs/Preview'
import { UsageRule } from '@/components/docs/UsageRule'
import { Callout } from '@/components/docs/Callout'
import { CodeBlock } from '@/components/docs/CodeBlock'

const FIGMA_URL = 'https://www.figma.com/design/0jMlITHtt6o1CYjjvepR0N/HeroUI-Figma-Kit--Community-?node-id=0-1'

const toc = [
  { id: 'anatomia', label: 'Anatomía', level: 2 },
  { id: 'layout', label: 'Layout', level: 2 },
  { id: 'validacion', label: 'Validación', level: 2 },
  { id: 'reglas', label: 'Reglas', level: 2 },
]

export default function FormsPage() {
  return (
    <DocPage
      title="Formularios"
      description="Patrón de composición para captura de datos: validación, estados de carga y manejo de errores. Un buen formulario reduce la fricción y previene errores antes de que ocurran."
      figmaUrl={FIGMA_URL}
      toc={toc}
    >
      <SectionTitle id="anatomia">Anatomía</SectionTitle>
      <DocText>Un formulario combina labels, inputs, hints, errores y un botón de envío que refleja el estado del proceso.</DocText>
      <Preview>
        <div className="bg-white border border-slate-200 rounded-xl p-6 w-72 space-y-4 text-left shadow-sm">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Email <span className="text-red-500">*</span></label>
            <input placeholder="escribe tu email" className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-sm placeholder:text-slate-400 outline-none" />
            <p className="text-xs text-slate-400">Usaremos este email para notificaciones</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Contraseña <span className="text-red-500">*</span></label>
            <input type="password" placeholder="******" className="w-full px-3 py-2.5 rounded-lg border border-red-500 ring-2 ring-red-500/20 bg-white text-sm outline-none" />
            <p className="text-xs text-red-500">Mínimo 8 caracteres</p>
          </div>
          <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium">Crear cuenta</button>
        </div>
      </Preview>

      <SectionTitle id="layout">Layout</SectionTitle>
      <div className="grid grid-cols-2 gap-3 my-5">
        {[
          { title: 'Una columna', desc: 'Para auth y flujos lineales. La opción por defecto.' },
          { title: 'Dos columnas', desc: 'Para perfiles con campos relacionados (nombre/apellido).' },
          { title: 'Agrupado', desc: 'Separadores visuales para secciones distintas.' },
          { title: 'Inline', desc: 'Búsqueda o filtros: campo + botón en la misma línea.' },
        ].map(p => (
          <div key={p.title} className="p-3 rounded-lg border border-border bg-card">
            <p className="text-sm font-medium text-foreground">{p.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
          </div>
        ))}
      </div>
      <Callout type="tip" title="Una columna gana casi siempre">
        Los formularios de una sola columna se completan más rápido y con menos errores. Usa dos columnas solo para campos cortos y relacionados.
      </Callout>

      <SectionTitle id="validacion">Validación</SectionTitle>
      <DocText>Valida en el momento adecuado: muestra errores tras abandonar el campo (onBlur), no mientras el usuario escribe.</DocText>
      <CodeBlock
        filename="Validación en tiempo real"
        language="tsx"
        code={`const [touched, setTouched] = useState<Record<string, boolean>>({})

const errors = {
  email: !email.includes('@') ? 'Introduce un email válido' : '',
  password: password.length < 8 ? 'Mínimo 8 caracteres' : '',
}

// Mostrar error solo si el campo fue tocado
<input onBlur={() => setTouched(t => ({ ...t, email: true }))} />
{touched.email && errors.email && (
  <p className="text-xs text-destructive">{errors.email}</p>
)}`}
      />

      <SectionTitle id="reglas">Reglas</SectionTitle>
      <UsageRule
        useWhen={[
          'Muestra errores tras abandonar el campo, no al escribir',
          'El botón refleja el estado: Guardar → Guardando... → Guardado',
          'Marca los campos obligatorios con asterisco',
          'Errores de servidor en la parte superior del formulario',
        ]}
        avoidWhen={[
          'No limpies los campos al recibir un error de servidor',
          'No valides en cada pulsación de tecla — frustra al usuario',
          'No uses más de una columna para campos largos',
          'No ocultes los requisitos de contraseña hasta que falle',
        ]}
      />
    </DocPage>
  )
}
