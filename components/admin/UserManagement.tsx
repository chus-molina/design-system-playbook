'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Shield, ShieldOff, Trash2, UserPlus, Users, Lock, Unlock } from 'lucide-react'

interface UserProfile {
  id: string
  email: string
  role: string
  blocked: boolean
  created_at: string
}

interface UserManagementProps {
  users: UserProfile[]
  currentUserId: string
}

export function UserManagement({ users: initialUsers, currentUserId }: UserManagementProps) {
  const supabase = createClient()
  const router = useRouter()
  const [users, setUsers] = useState(initialUsers)
  const [loading, setLoading] = useState<string | null>(null)
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [changePw, setChangePw] = useState('')
  const [changingPw, setChangingPw] = useState(false)

  const toggleBlock = async (userId: string, currentBlocked: boolean) => {
    setLoading(userId)
    const { error } = await supabase
      .from('profiles')
      .update({ blocked: !currentBlocked })
      .eq('id', userId)

    if (!error) {
      setUsers(u => u.map(p => p.id === userId ? { ...p, blocked: !currentBlocked } : p))
    }
    setLoading(null)
  }

  const deleteUser = async (userId: string) => {
    if (!confirm('¿Eliminar este usuario? Esta acción no se puede deshacer.')) return
    setLoading(userId)
    await supabase.from('profiles').delete().eq('id', userId)
    setUsers(u => u.filter(p => p.id !== userId))
    setLoading(null)
  }

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    setError('')

    const { error } = await supabase.auth.admin?.createUser({
      email: newEmail,
      password: newPassword,
      email_confirm: true,
    }) ?? {}

    if (error) {
      setError('No se pudo crear el usuario. Usa el panel de Supabase para crear usuarios desde admin.')
    } else {
      setNewEmail('')
      setNewPassword('')
      setShowCreate(false)
      router.refresh()
    }
    setCreating(false)
  }

  const changeMyPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setChangingPw(true)
    const { error } = await supabase.auth.updateUser({ password: changePw })
    if (!error) {
      setChangePw('')
      alert('Contraseña actualizada correctamente')
    } else {
      alert('Error al cambiar la contraseña')
    }
    setChangingPw(false)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestión de Usuarios</h1>
        <p className="text-muted-foreground mt-1">Administra accesos al Design System Playbook.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-border bg-card text-center">
          <p className="text-2xl font-bold text-foreground">{users.length}</p>
          <p className="text-sm text-muted-foreground">Usuarios totales</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card text-center">
          <p className="text-2xl font-bold text-foreground">{users.filter(u => !u.blocked).length}</p>
          <p className="text-sm text-muted-foreground">Activos</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card text-center">
          <p className="text-2xl font-bold text-destructive">{users.filter(u => u.blocked).length}</p>
          <p className="text-sm text-muted-foreground">Bloqueados</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5" /> Usuarios
          </h2>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Crear usuario
          </button>
        </div>

        {showCreate && (
          <form onSubmit={createUser} className="p-4 rounded-xl border border-border bg-card space-y-3">
            <h3 className="font-semibold text-foreground text-sm">Nuevo usuario</h3>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Email</label>
                <input
                  type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)}
                  placeholder="escribe tu email" required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Contraseña temporal</label>
                <input
                  type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                  placeholder="******" required minLength={8}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={creating} className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium disabled:opacity-60">
                {creating ? 'Creando...' : 'Crear'}
              </button>
              <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 border border-border rounded-lg text-sm text-foreground hover:bg-muted">
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Usuario</th>
                <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Rol</th>
                <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Estado</th>
                <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Registro</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs font-bold flex-shrink-0">
                        {u.email?.[0]?.toUpperCase()}
                      </div>
                      <span className="text-foreground truncate max-w-[200px]">{u.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      u.role === 'admin' ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                    }`}>
                      {u.role === 'admin' ? 'Admin' : 'Usuario'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      u.blocked ? 'bg-destructive/10 text-destructive' : 'bg-green-500/10 text-green-600'
                    }`}>
                      {u.blocked ? 'Bloqueado' : 'Activo'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {new Date(u.created_at).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-4 py-3">
                    {u.id !== currentUserId && (
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => toggleBlock(u.id, u.blocked)}
                          disabled={loading === u.id}
                          title={u.blocked ? 'Desbloquear' : 'Bloquear'}
                          className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                        >
                          {u.blocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => deleteUser(u.id)}
                          disabled={loading === u.id}
                          title="Eliminar usuario"
                          className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {u.id === currentUserId && (
                      <span className="text-xs text-muted-foreground px-2">Tú</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4 border-t border-border pt-8">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Shield className="w-5 h-5" /> Cambiar mi contraseña
        </h2>
        <form onSubmit={changeMyPassword} className="flex gap-3 max-w-sm">
          <input
            type="password" value={changePw} onChange={e => setChangePw(e.target.value)}
            placeholder="Nueva contraseña" required minLength={8}
            className="flex-1 px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
          <button type="submit" disabled={changingPw} className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium disabled:opacity-60">
            {changingPw ? '...' : 'Cambiar'}
          </button>
        </form>
      </div>
    </div>
  )
}
