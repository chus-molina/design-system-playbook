import { ComponentDoc } from '@/components/docs/ComponentDoc'
import { CodeBlock } from '@/components/docs/CodeBlock'

const formCode = `// Patrón de formulario de login
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function LoginForm() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError('Credenciales incorrectas'); setLoading(false); return }
    router.push('/')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="space-y-1">
        <label className="text-sm font-medium">Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="escribe tu email" required
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none" />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Contraseña</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          placeholder="******" required
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none" />
      </div>
      <button type="submit" disabled={loading}
        className="w-full py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium disabled:opacity-60">
        {loading ? 'Iniciando...' : 'Iniciar sesión'}
      </button>
    </form>
  )
}`

const validationCode = `// Validación en tiempo real
const [touched, setTouched] = useState<Record<string, boolean>>({})

const errors = {
  email: !email.includes('@') ? 'Email inválido' : '',
  password: password.length < 8 ? 'Mínimo 8 caracteres' : '',
}

// En el input
onBlur={() => setTouched(t => ({ ...t, email: true }))}

// Mostrar error solo si el campo fue tocado
{touched.email && errors.email && (
  <p className="text-xs text-destructive">{errors.email}</p>
)}`

export default function FormsPage() {
  return (
    <ComponentDoc
      name="Formularios"
      description="Patrones de composición para formularios con validación, estados de carga y manejo de errores."
      tabs={[
        {
          id: 'design',
          label: 'Diseño',
          content: (
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Anatomía de un formulario</h2>
                <div className="p-6 rounded-xl border border-border bg-card space-y-4 max-w-sm">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Email <span className="text-destructive">*</span></label>
                    <input placeholder="escribe tu email" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Usaremos este email para enviarte notificaciones</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Contraseña <span className="text-destructive">*</span></label>
                    <input type="password" placeholder="******" className="w-full px-3 py-2.5 rounded-lg border border-[hsl(0,84%,60%)] bg-background text-sm ring-2 ring-[hsl(0,84%,60%)]/20 outline-none" />
                    <p className="text-xs text-[hsl(0,84%,60%)]">La contraseña debe tener al menos 8 caracteres</p>
                  </div>
                  <button className="w-full py-2.5 bg-[hsl(221,83%,53%)] text-white rounded-lg text-sm font-medium">
                    Iniciar sesión
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Principios de layout</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { title: 'Una columna', desc: 'Para formularios de auth y flujos lineales' },
                    { title: 'Dos columnas', desc: 'Para formularios de perfil con campos relacionados' },
                    { title: 'Agrupados', desc: 'Usa separadores visuales para secciones distintas' },
                    { title: 'Inline', desc: 'Búsqueda o filtros — campo + botón en la misma línea' },
                  ].map(p => (
                    <div key={p.title} className="p-3 rounded-lg border border-border bg-card">
                      <p className="text-sm font-medium text-foreground">{p.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
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
              <CodeBlock code={formCode} language="tsx" filename="Formulario de login completo" />
              <CodeBlock code={validationCode} language="tsx" filename="Validación en tiempo real" />
            </div>
          ),
        },
        {
          id: 'content',
          label: 'Contenido',
          content: (
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-foreground font-semibold">Reglas de formularios</h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li>Muestra errores de validación solo después de que el usuario haya tocado el campo.</li>
                <li>El botón de envío refleja el estado: "Guardar" → "Guardando..." → "Guardado ✓".</li>
                <li>Los campos obligatorios se marcan con asterisco rojo al final del label.</li>
                <li>Los errores de servidor se muestran en la parte superior del formulario, no en el campo.</li>
                <li>Nunca limpies los campos al recibir un error — el usuario quiere corregir, no reescribir.</li>
              </ul>
            </div>
          ),
        },
      ]}
    />
  )
}
