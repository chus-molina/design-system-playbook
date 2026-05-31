'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, AlertCircle, CheckCircle, Info } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: '8–16 caracteres', ok: password.length >= 8 && password.length <= 16 },
    { label: 'Al menos una letra', ok: /[a-zA-Z]/.test(password) },
    { label: 'Al menos un número', ok: /\d/.test(password) },
    { label: 'Al menos un símbolo', ok: /[^a-zA-Z0-9]/.test(password) },
  ]
  if (!password) return null
  return (
    <div className="mt-2 space-y-1">
      {checks.map(c => (
        <div key={c.label} className={`flex items-center gap-1.5 text-xs ${c.ok ? 'text-green-500' : 'text-muted-foreground'}`}>
          <CheckCircle className={`w-3 h-3 ${c.ok ? 'text-green-500' : 'text-muted-foreground'}`} />
          {c.label}
        </div>
      ))}
    </div>
  )
}

export default function RegisterPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password.length < 8 || password.length > 16) {
      setError('La contraseña debe tener entre 8 y 16 caracteres')
      setLoading(false)
      return
    }
    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
      setError('La contraseña debe incluir letras, números y símbolos')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm text-center space-y-4">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
          <h2 className="text-xl font-bold text-foreground">¡Revisa tu email!</h2>
          <p className="text-muted-foreground text-sm">
            Hemos enviado un enlace de confirmación a <strong>{email}</strong>. Confirma tu cuenta para acceder.
          </p>
          <Link href="/login" className="block mt-4 text-accent hover:underline text-sm">
            Volver al login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo className="w-12 h-12" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Crear cuenta</h1>
          <p className="text-muted-foreground mt-1 text-sm">Accede al Design System Playbook</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted border border-border text-xs text-muted-foreground">
            <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            Contraseña segura: 8-16 caracteres con letras, números y símbolos (ej: <code>M1Clave#!</code>)
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="escribe tu email"
              required
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="******"
                required
                className="w-full px-3 py-2.5 pr-10 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <PasswordStrength password={password} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-accent text-accent-foreground rounded-lg font-medium text-sm hover:bg-accent/90 disabled:opacity-60 transition-colors"
          >
            {loading ? 'Registrando...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-accent hover:underline font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
