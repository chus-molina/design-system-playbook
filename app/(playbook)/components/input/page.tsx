import { DocPage, SectionTitle, SubTitle, DocText, CodeInline } from '@/components/docs/DocPage'
import { Preview } from '@/components/docs/Preview'
import { DoDont, Do, Dont } from '@/components/docs/DoDont'
import { PropsTable } from '@/components/docs/PropsTable'
import { UsageRule } from '@/components/docs/UsageRule'
import { Callout } from '@/components/docs/Callout'
import { CodeBlock } from '@/components/docs/CodeBlock'

const FIGMA_URL = 'https://www.figma.com/design/0jMlITHtt6o1CYjjvepR0N/HeroUI-Figma-Kit--Community-?node-id=4281-261394&t=OjFe5BIgvZKQwgNQ-0'

const toc = [
  { id: 'uso-basico', label: 'Uso básico', level: 2 },
  { id: 'estados', label: 'Estados', level: 2 },
  { id: 'cuando-usarlo', label: 'Cuándo usarlo', level: 2 },
  { id: 'do-dont', label: "Do / Don't", level: 2 },
  { id: 'props', label: 'Props', level: 2 },
  { id: 'accesibilidad', label: 'Accesibilidad', level: 2 },
]

function Field({ label, placeholder, value, error, hint, disabled, type = 'text' }: {
  label?: string; placeholder?: string; value?: string; error?: string; hint?: string; disabled?: boolean; type?: string
}) {
  return (
    <div className="w-64 space-y-1 text-left">
      {label && <label className={`text-sm font-medium ${disabled ? 'text-slate-400' : 'text-slate-700'}`}>{label}</label>}
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-2.5 rounded-lg border bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none transition-colors
          ${error ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}
          ${disabled ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : ''}`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

export default function InputPage() {
  return (
    <DocPage
      title="Input"
      description="Campo de texto para captura de datos del usuario. Su diseño prioriza la claridad del estado actual y guía hacia la acción correcta mediante labels, hints y mensajes de error accionables."
      figmaUrl={FIGMA_URL}
      toc={toc}
    >
      <SectionTitle id="uso-basico">Uso básico</SectionTitle>
      <DocText>
        Todo input necesita un <CodeInline>label</CodeInline> visible. El <CodeInline>placeholder</CodeInline> muestra el formato esperado, nunca sustituye al label.
      </DocText>
      <Preview code={`<Input label="Email" placeholder="escribe tu email" type="email" />`}>
        <Field label="Email" placeholder="escribe tu email" type="email" />
      </Preview>

      <SectionTitle id="estados">Estados</SectionTitle>
      <SubTitle>Normal y foco</SubTitle>
      <Preview>
        <div className="flex flex-col gap-4">
          <Field label="Normal" placeholder="escribe tu email" />
          <Field label="Con foco" value="usuario@email.com" />
        </div>
      </Preview>

      <SubTitle>Error</SubTitle>
      <DocText>El mensaje de error explica qué falló y cómo corregirlo. Nunca uses &quot;Campo inválido&quot;.</DocText>
      <Preview code={`<Input label="Email" error="El email ya existe en el sistema" />`}>
        <Field label="Email" value="info@" error="Introduce un email válido (ej: nombre@dominio.com)" />
      </Preview>

      <SubTitle>Con hint</SubTitle>
      <DocText>El hint da reglas de formato de forma preventiva, antes de que el usuario escriba.</DocText>
      <Preview code={`<Input label="Contraseña" hint="8-16 caracteres, letras, números y símbolos" />`}>
        <Field label="Contraseña" type="password" placeholder="******" hint="8-16 caracteres, letras, números y símbolos" />
      </Preview>

      <SubTitle>Deshabilitado</SubTitle>
      <Preview code={`<Input label="Email verificado" value="info@chusmolina.com" disabled />`}>
        <Field label="Email verificado" value="info@chusmolina.com" disabled />
      </Preview>

      <SectionTitle id="cuando-usarlo">Cuándo usarlo</SectionTitle>
      <UsageRule
        useWhen={[
          'Capturar texto libre: nombre, email, búsqueda, contraseña',
          'Formularios de registro, login y configuración de perfil',
          'Filtros y búsquedas en tablas o listados',
          'Cuando el valor puede variar libremente sin opciones predefinidas',
        ]}
        avoidWhen={[
          'Cuando las opciones son limitadas — usa Select o Radio',
          'Para fechas — usa un Date picker dedicado',
          'Para texto largo de varias líneas — usa Textarea',
          'Cuando el campo no es editable — muestra el valor como texto plano',
        ]}
      />

      <SectionTitle id="do-dont">Do / Don&apos;t</SectionTitle>
      <DoDont description="El label dice qué es el campo; el placeholder muestra el formato. Tienen funciones distintas y complementarias.">
        <Do label="Label + placeholder complementarios">
          <Field label="Fecha de nacimiento" placeholder="dd/mm/aaaa" />
        </Do>
        <Dont label="Placeholder como único label">
          <Field placeholder="Fecha de nacimiento" />
        </Dont>
      </DoDont>

      <DoDont description="Los mensajes de error explican qué pasó y cómo resolverlo, no solo que algo está mal.">
        <Do label="Error explicativo y accionable">
          <Field value="info@" error="El email ya está registrado. ¿Quieres iniciar sesión?" />
        </Do>
        <Dont label="Error genérico que no ayuda">
          <Field value="info@" error="Campo inválido" />
        </Dont>
      </DoDont>

      <SectionTitle id="props">Props</SectionTitle>
      <PropsTable items={[
        { name: 'label', type: 'string', description: 'Label visible del campo. Siempre requerido para accesibilidad.' },
        { name: 'placeholder', type: 'string', description: 'Texto de ayuda que describe el formato esperado, no el propósito del campo.' },
        { name: 'type', type: 'string', default: "'text'", description: 'Tipo HTML: text, email, password, number, tel, search...' },
        { name: 'error', type: 'string', description: 'Mensaje de error. Activa el estado visual de error automáticamente.' },
        { name: 'hint', type: 'string', description: 'Texto de ayuda preventivo. Se oculta cuando hay un error activo.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita el campo. No editable ni focusable.' },
        { name: 'required', type: 'boolean', default: 'false', description: 'Marca el campo como obligatorio.' },
      ]} />

      <SectionTitle id="accesibilidad">Accesibilidad</SectionTitle>
      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground my-3">
        <li>El <CodeInline>label</CodeInline> debe asociarse al input mediante <CodeInline>htmlFor</CodeInline> e <CodeInline>id</CodeInline>.</li>
        <li>El <CodeInline>placeholder</CodeInline> no sustituye al label — desaparece al escribir y no todos los lectores de pantalla lo leen.</li>
        <li>Los errores se asocian con <CodeInline>aria-describedby</CodeInline> y <CodeInline>aria-invalid</CodeInline>.</li>
      </ul>

      <CodeBlock
        filename="components/ui/Input.tsx"
        language="tsx"
        code={`import { cn } from '@/lib/utils'
import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\\s+/g, '-')
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          className={cn(
            'w-full px-3 py-2.5 rounded-lg border bg-card text-foreground text-sm',
            'placeholder:text-muted-foreground transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent',
            'disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-muted',
            error ? 'border-destructive ring-2 ring-destructive/20' : 'border-border',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
        {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    )
  }
)`}
      />
    </DocPage>
  )
}
