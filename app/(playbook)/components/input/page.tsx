import { ComponentDoc } from '@/components/docs/ComponentDoc'
import { TokenTable } from '@/components/docs/TokenTable'
import { CodeBlock } from '@/components/docs/CodeBlock'

const tokens = [
  { name: 'border', value: 'border border-border rounded-lg', description: 'Estado normal' },
  { name: 'focus', value: 'ring-2 ring-accent/50 border-accent', description: 'Estado activo' },
  { name: 'error', value: 'border-destructive ring-2 ring-destructive/20', description: 'Validación fallida' },
  { name: 'disabled', value: 'opacity-60 cursor-not-allowed bg-muted', description: 'Campo inactivo' },
  { name: 'padding', value: 'px-3 py-2.5', description: 'Padding interno estándar' },
  { name: 'font', value: 'text-sm text-foreground', description: 'Tipografía del valor' },
  { name: 'placeholder', value: 'placeholder:text-muted-foreground', description: 'Color del placeholder' },
]

const componentCode = `// components/ui/Input.tsx
import { cn } from '@/lib/utils'
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
)`

const usageCode = `import { Input } from '@/components/ui/Input'

// Básico
<Input label="Email" placeholder="escribe tu email" type="email" />

// Con error
<Input
  label="Contraseña"
  type="password"
  placeholder="******"
  error="La contraseña debe tener al menos 8 caracteres"
/>

// Con hint
<Input
  label="Usuario"
  placeholder="@nombre_usuario"
  hint="Solo letras, números y guiones bajos"
/>

// Deshabilitado
<Input label="Email verificado" value="info@chusmolina.com" disabled />`

export default function InputPage() {
  return (
    <ComponentDoc
      name="Input"
      description="Campo de texto para captura de datos del usuario. Soporta estados de validación, hints y labels accesibles."
      tabs={[
        {
          id: 'design',
          label: 'Diseño',
          content: (
            <div className="space-y-6 max-w-md">
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Estados</h2>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Normal</label>
                  <input placeholder="escribe tu email" className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Focus (activo)</label>
                  <input placeholder="Con foco" defaultValue="usuario@ejemplo.com" className="w-full px-3 py-2.5 rounded-lg border border-[hsl(221,83%,53%)] bg-card text-foreground text-sm ring-2 ring-[hsl(221,83%,53%)]/30 outline-none" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Error</label>
                  <input placeholder="Email inválido" className="w-full px-3 py-2.5 rounded-lg border border-[hsl(0,84%,60%)] bg-card text-foreground text-sm ring-2 ring-[hsl(0,84%,60%)]/20 outline-none" />
                  <p className="text-xs text-[hsl(0,84%,60%)]">Introduce un email válido</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground opacity-60">Deshabilitado</label>
                  <input placeholder="No editable" className="w-full px-3 py-2.5 rounded-lg border border-border bg-muted text-muted-foreground text-sm cursor-not-allowed" disabled />
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
              <TokenTable tokens={tokens} title="Tokens de estado" />
              <CodeBlock code={componentCode} language="tsx" filename="components/ui/Input.tsx" />
              <CodeBlock code={usageCode} language="tsx" filename="Uso" />
            </div>
          ),
        },
        {
          id: 'content',
          label: 'Contenido',
          content: (
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-foreground font-semibold">Labels y placeholders</h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li><strong className="text-foreground">Label:</strong> describe QUÉ se pide. Siempre visible, nunca lo reemplaza el placeholder.</li>
                <li><strong className="text-foreground">Placeholder:</strong> muestra el formato esperado (<code>dd/mm/aaaa</code>) o un ejemplo (<code>ej: Juan García</code>).</li>
                <li><strong className="text-foreground">Error:</strong> explica qué falló y cómo corregirlo — no "Campo inválido".</li>
                <li><strong className="text-foreground">Hint:</strong> reglas de formato preventivas antes de que el usuario escriba.</li>
              </ul>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-green-500/30 bg-green-500/5">
                  <p className="text-xs font-semibold text-green-600 mb-1">✓ Correcto</p>
                  <p className="text-foreground text-xs">El email ya existe en el sistema</p>
                </div>
                <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
                  <p className="text-xs font-semibold text-destructive mb-1">✕ Evitar</p>
                  <p className="text-foreground text-xs">Error en el campo email</p>
                </div>
              </div>
            </div>
          ),
        },
      ]}
    />
  )
}
