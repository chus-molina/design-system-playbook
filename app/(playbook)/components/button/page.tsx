import { DocPage, SectionTitle, SubTitle, DocText, CodeInline } from '@/components/docs/DocPage'
import { Preview } from '@/components/docs/Preview'
import { DoDont, Do, Dont } from '@/components/docs/DoDont'
import { PropsTable } from '@/components/docs/PropsTable'
import { UsageRule } from '@/components/docs/UsageRule'
import { Callout } from '@/components/docs/Callout'
import { CodeBlock } from '@/components/docs/CodeBlock'

const FIGMA_URL = 'https://www.figma.com/design/0jMlITHtt6o1CYjjvepR0N/HeroUI-Figma-Kit--Community-?node-id=4281-261159&t=OjFe5BIgvZKQwgNQ-0'

const toc = [
  { id: 'uso-basico', label: 'Uso básico', level: 2 },
  { id: 'variantes', label: 'Variantes', level: 2 },
  { id: 'tamanos', label: 'Tamaños', level: 2 },
  { id: 'estados', label: 'Estados', level: 2 },
  { id: 'cuando-usarlo', label: 'Cuándo usarlo', level: 2 },
  { id: 'do-dont', label: 'Do / Don\'t', level: 2 },
  { id: 'props', label: 'Props', level: 2 },
  { id: 'accesibilidad', label: 'Accesibilidad', level: 2 },
]

// Btn — componente visual de demostración
function Btn({ variant = 'primary', size = 'md', disabled = false, loading = false, children }: {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  const v = {
    primary:     'bg-blue-600 text-white hover:bg-blue-700',
    secondary:   'bg-slate-100 text-slate-900 hover:bg-slate-200',
    outline:     'border border-slate-300 bg-transparent text-slate-900 hover:bg-slate-50',
    ghost:       'bg-transparent text-slate-900 hover:bg-slate-100',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
  }
  const s = {
    sm: 'px-3 py-1.5 text-xs rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-xl',
  }
  return (
    <button disabled={disabled || loading} className={`inline-flex items-center gap-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${v[variant]} ${s[size]}`}>
      {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  )
}

export default function ButtonPage() {
  return (
    <DocPage
      title="Button"
      description="Los botones permiten al usuario ejecutar una acción o navegar. Son el elemento interactivo más común y su uso correcto define la jerarquía visual de cada pantalla."
      figmaUrl={FIGMA_URL}
      toc={toc}
    >
      <SectionTitle id="uso-basico">Uso básico</SectionTitle>
      <DocText>
        El botón <CodeInline>primary</CodeInline> es la acción principal de la pantalla. Solo debe existir uno por vista para mantener la jerarquía clara.
      </DocText>
      <Preview code={`<Button variant="primary">Guardar cambios</Button>`}>
        <Btn variant="primary">Guardar cambios</Btn>
      </Preview>

      <SectionTitle id="variantes">Variantes</SectionTitle>
      <DocText>
        Cada variante tiene un nivel de énfasis diferente. Elige según la importancia de la acción dentro del contexto.
      </DocText>
      <Preview code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>`}>
        <Btn variant="primary">Primary</Btn>
        <Btn variant="secondary">Secondary</Btn>
        <Btn variant="outline">Outline</Btn>
        <Btn variant="ghost">Ghost</Btn>
        <Btn variant="destructive">Destructive</Btn>
      </Preview>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { variant: 'primary' as const, title: 'Primary', desc: 'Acción principal de la pantalla. Solo uno por vista.' },
          { variant: 'secondary' as const, title: 'Secondary', desc: 'Acción complementaria de menor énfasis.' },
          { variant: 'outline' as const, title: 'Outline', desc: 'Acción neutral. Para cancelar o explorar.' },
          { variant: 'ghost' as const, title: 'Ghost', desc: 'Acción terciaria discreta, integrada en el flujo.' },
          { variant: 'destructive' as const, title: 'Destructive', desc: 'Eliminar o acciones irreversibles. Siempre con confirmación.' },
        ].map(({ variant, title, desc }) => (
          <div key={variant} className="p-4 rounded-xl border border-border bg-card space-y-2">
            <Btn variant={variant} size="sm">{title}</Btn>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      <Callout type="tip" title="Jerarquía de botones">
        En una misma pantalla: máximo un Primary, uno Secondary y uno Ghost. Si tienes más de tres botones, el flujo necesita ser rediseñado.
      </Callout>

      <SectionTitle id="tamanos">Tamaños</SectionTitle>
      <DocText>
        Usa <CodeInline>sm</CodeInline> en tablas y espacios compactos, <CodeInline>md</CodeInline> como estándar en formularios y paneles, y <CodeInline>lg</CodeInline> para CTAs de hero o pantallas de captación.
      </DocText>
      <Preview code={`<Button size="sm">Pequeño</Button>
<Button size="md">Mediano</Button>
<Button size="lg">Grande</Button>`}>
        <div className="flex items-center gap-4">
          <div className="text-center space-y-2">
            <Btn size="sm" variant="primary">Pequeño</Btn>
            <p className="text-xs text-gray-400">sm · 12px</p>
          </div>
          <div className="text-center space-y-2">
            <Btn size="md" variant="primary">Mediano</Btn>
            <p className="text-xs text-gray-400">md · 14px</p>
          </div>
          <div className="text-center space-y-2">
            <Btn size="lg" variant="primary">Grande</Btn>
            <p className="text-xs text-gray-400">lg · 16px</p>
          </div>
        </div>
      </Preview>

      <SectionTitle id="estados">Estados</SectionTitle>
      <SubTitle>Disabled</SubTitle>
      <DocText>
        Usa <CodeInline>disabled</CodeInline> cuando la acción no está disponible. El usuario siempre debe entender por qué — añade un tooltip o un mensaje explicativo cercano.
      </DocText>
      <Preview code={`<Button disabled>No disponible</Button>`}>
        <Btn disabled>No disponible</Btn>
      </Preview>

      <SubTitle>Loading</SubTitle>
      <DocText>
        Usa <CodeInline>loading</CodeInline> mientras se procesa una acción asíncrona. El botón se deshabilita automáticamente y muestra un spinner. El texto debe describir el proceso activo.
      </DocText>
      <Preview code={`<Button loading>Guardando...</Button>`}>
        <Btn loading variant="primary">Guardando...</Btn>
      </Preview>

      <SectionTitle id="cuando-usarlo">Cuándo usarlo</SectionTitle>
      <UsageRule
        useWhen={[
          'La acción principal de la pantalla (guardar, confirmar, enviar)',
          'Acciones que el usuario puede deshacer — o cuando requieren confirmación explícita',
          'Cuando necesitas diferenciar visualmente acciones de distinto peso',
          'Para navegar entre pasos en un flujo multi-step',
        ]}
        avoidWhen={[
          'Como sustituto de un enlace de navegación — usa un componente Link',
          'Más de un botón Primary en la misma vista',
          'Textos de más de 4 palabras en el label',
          'Acciones tan frecuentes que interrumpan el flujo — usa un icono clicable',
        ]}
      />

      <SectionTitle id="do-dont">Do / Don&apos;t</SectionTitle>
      <DoDont description="El texto del botón debe describir exactamente lo que ocurrirá al pulsarlo. El usuario no debería tener dudas.">
        <Do label="Verbo + objeto específico">
          <Btn variant="primary">Guardar cambios</Btn>
          <Btn variant="destructive">Eliminar cuenta</Btn>
        </Do>
        <Dont label="Textos vagos o genéricos">
          <Btn variant="primary">Click aquí</Btn>
          <Btn variant="destructive">Eliminar</Btn>
        </Dont>
      </DoDont>

      <DoDont description="No pongas dos botones del mismo peso visual compitiendo entre sí. El usuario debe tener claro cuál es la acción principal.">
        <Do label="Un Primary, el resto de menor énfasis">
          <Btn variant="primary">Confirmar pedido</Btn>
          <Btn variant="outline">Cancelar</Btn>
        </Do>
        <Dont label="Dos Primary compiten entre sí">
          <Btn variant="primary">Confirmar</Btn>
          <Btn variant="primary">Cancelar</Btn>
        </Dont>
      </DoDont>

      <DoDont description="Los estados de loading deben cambiar el texto del botón para comunicar que algo está pasando.">
        <Do label="Texto que describe el proceso activo">
          <Btn loading variant="primary">Guardando...</Btn>
        </Do>
        <Dont label="Loading sin contexto de qué está pasando">
          <Btn loading variant="primary">Guardar</Btn>
        </Dont>
      </DoDont>

      <SectionTitle id="props">Props</SectionTitle>
      <PropsTable items={[
        { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'", default: "'primary'", description: 'Estilo visual del botón. Define su nivel de énfasis en la jerarquía.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño del botón. sm para espacios compactos, lg para CTAs hero.' },
        { name: 'loading', type: 'boolean', default: 'false', description: 'Muestra un spinner y deshabilita el botón automáticamente mientras procesa.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita el botón. Acompaña siempre con explicación del motivo.' },
        { name: 'onClick', type: '() => void', description: 'Función que se ejecuta al pulsar el botón.' },
        { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'Tipo HTML del botón. Usa submit dentro de formularios.' },
        { name: 'className', type: 'string', description: 'Clases CSS adicionales para personalización puntual.' },
      ]} />

      <SectionTitle id="accesibilidad">Accesibilidad</SectionTitle>
      <DocText>El elemento <CodeInline>&lt;button&gt;</CodeInline> nativo proporciona comportamiento de teclado y roles ARIA automáticamente. No uses <CodeInline>div</CodeInline> ni <CodeInline>span</CodeInline> como botón.</DocText>
      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground my-3">
        <li>En estado <CodeInline>disabled</CodeInline>, el botón no recibe foco. Si necesitas mantenerlo, usa <CodeInline>aria-disabled</CodeInline> con <CodeInline>tabIndex=0</CodeInline>.</li>
        <li>Botones de solo icono deben llevar <CodeInline>aria-label</CodeInline> descriptivo.</li>
        <li>El estado <CodeInline>loading</CodeInline> debe comunicarse con <CodeInline>aria-busy=&quot;true&quot;</CodeInline>.</li>
      </ul>
      <Callout type="warning" title="Botones solo con icono">
        Si el botón no tiene texto visible, siempre añade <CodeInline>aria-label</CodeInline>. Sin él, los usuarios de lectores de pantalla no saben qué hace el botón.
      </Callout>

      <CodeBlock
        filename="components/ui/Button.tsx"
        language="tsx"
        code={`import { cn } from '@/lib/utils'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

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
      aria-busy={loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        variants[variant], sizes[size], className,
      )}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
)`}
      />
    </DocPage>
  )
}
