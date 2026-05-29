import { ComponentDoc } from '@/components/docs/ComponentDoc'
import { TokenTable } from '@/components/docs/TokenTable'
import { CodeBlock } from '@/components/docs/CodeBlock'

const tokens = [
  { name: 'overlay', value: 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50', description: 'Fondo oscuro' },
  { name: 'container', value: 'fixed inset-0 flex items-center justify-center p-4', description: 'Centra el modal' },
  { name: 'dialog', value: 'bg-card border border-border rounded-2xl shadow-xl w-full max-w-md', description: 'Panel del modal' },
  { name: 'header', value: 'flex items-center justify-between p-5 border-b border-border', description: 'Encabezado' },
  { name: 'body', value: 'p-5', description: 'Cuerpo del modal' },
  { name: 'footer', value: 'flex items-center justify-end gap-2 p-5 border-t border-border', description: 'Pie con acciones' },
]

const componentCode = `'use client'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
}

export function Modal({ open, onClose, title, description, children, size = 'md' }: ModalProps) {
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
        <div
          role="dialog"
          aria-modal
          aria-labelledby="modal-title"
          className={cn('bg-card border border-border rounded-2xl shadow-xl w-full pointer-events-auto', sizes[size])}
          onClick={e => e.stopPropagation()}
        >
          {title && (
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <h2 id="modal-title" className="text-base font-semibold text-foreground">{title}</h2>
                {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  )
}

export function ModalBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-5', className)}>{children}</div>
}

export function ModalFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-end gap-2 p-5 border-t border-border">{children}</div>
}`

const usageCode = `'use client'
import { useState } from 'react'
import { Modal, ModalBody, ModalFooter } from '@/components/ui/Modal'

export function DeleteModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Eliminar cuenta</button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="¿Eliminar cuenta?"
        description="Esta acción no se puede deshacer."
      >
        <ModalBody>
          <p className="text-sm text-muted-foreground">
            Se eliminarán todos tus datos permanentemente.
          </p>
        </ModalBody>
        <ModalFooter>
          <button onClick={() => setOpen(false)}>Cancelar</button>
          <button className="text-white bg-destructive px-4 py-2 rounded-lg text-sm">
            Sí, eliminar
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
}`

export default function ModalPage() {
  return (
    <ComponentDoc
      name="Modal"
      description="Diálogo superpuesto para acciones que requieren confirmación o contenido contextual."
      tabs={[
        {
          id: 'design',
          label: 'Diseño',
          content: (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">Vista estática del modal (en producción aparece sobre overlay):</p>

              <div className="relative bg-muted/50 rounded-xl border border-dashed border-border p-8 flex items-center justify-center">
                <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-sm">
                  <div className="flex items-center justify-between p-5 border-b border-border">
                    <div>
                      <h2 className="text-base font-semibold text-foreground">¿Eliminar cuenta?</h2>
                      <p className="text-sm text-muted-foreground mt-0.5">Esta acción no se puede deshacer.</p>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">✕</button>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground">Se eliminarán todos tus datos permanentemente.</p>
                  </div>
                  <div className="flex items-center justify-end gap-2 p-5 border-t border-border">
                    <button className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-muted text-foreground">Cancelar</button>
                    <button className="px-4 py-2 text-sm rounded-lg bg-[hsl(0,84%,60%)] text-white font-medium">Sí, eliminar</button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Tipos de modal</h2>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Confirmación', desc: 'Acción irreversible que requiere confirmación explícita' },
                    { label: 'Formulario', desc: 'Captura de datos en contexto sin abandonar la página' },
                    { label: 'Información', desc: 'Detalle adicional de un elemento sin navegación' },
                  ].map(t => (
                    <div key={t.label} className="p-3 rounded-lg border border-border bg-card">
                      <p className="font-medium text-sm text-foreground">{t.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
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
              <TokenTable tokens={tokens} title="Tokens del modal" />
              <CodeBlock code={componentCode} language="tsx" filename="components/ui/Modal.tsx" />
              <CodeBlock code={usageCode} language="tsx" filename="Uso" />
            </div>
          ),
        },
        {
          id: 'content',
          label: 'Contenido',
          content: (
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-foreground font-semibold">Títulos de modal</h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li>Usa pregunta para confirmaciones destructivas: "¿Eliminar proyecto?"</li>
                <li>Usa verbo + objeto para formularios: "Editar perfil", "Crear equipo"</li>
                <li>El botón primario repite la acción del título — nunca "Aceptar" o "OK".</li>
                <li>El botón secundario siempre es "Cancelar" para dar salida clara.</li>
              </ul>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="p-3 rounded-lg border border-green-500/30 bg-green-500/5 text-xs">
                  <p className="text-green-600 font-semibold mb-1">✓ Correcto</p>
                  <p className="font-medium text-foreground">¿Cerrar sesión?</p>
                  <p className="text-muted-foreground mt-1">Botones: "Cancelar" / "Cerrar sesión"</p>
                </div>
                <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5 text-xs">
                  <p className="text-destructive font-semibold mb-1">✕ Evitar</p>
                  <p className="font-medium text-foreground">Advertencia</p>
                  <p className="text-muted-foreground mt-1">Botones: "No" / "Sí"</p>
                </div>
              </div>
            </div>
          ),
        },
      ]}
    />
  )
}
