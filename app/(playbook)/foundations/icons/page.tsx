import { ComponentDoc } from '@/components/docs/ComponentDoc'
import { CodeBlock } from '@/components/docs/CodeBlock'
import {
  Home, Settings, User, Search, Bell, Heart, Star, Bookmark,
  ArrowRight, ChevronDown, X, Check, Plus, Minus, Edit, Trash2,
  Upload, Download, Share, Eye, EyeOff, Lock, Unlock, Mail,
  Phone, Globe, Calendar, Clock, AlertCircle, Info, HelpCircle,
  Loader2, RefreshCw
} from 'lucide-react'

const iconGroups = [
  {
    label: 'Navegación',
    icons: [
      { name: 'Home', Icon: Home },
      { name: 'Settings', Icon: Settings },
      { name: 'Search', Icon: Search },
      { name: 'ArrowRight', Icon: ArrowRight },
      { name: 'ChevronDown', Icon: ChevronDown },
    ],
  },
  {
    label: 'Acciones',
    icons: [
      { name: 'Plus', Icon: Plus },
      { name: 'Minus', Icon: Minus },
      { name: 'Edit', Icon: Edit },
      { name: 'Trash2', Icon: Trash2 },
      { name: 'Upload', Icon: Upload },
      { name: 'Download', Icon: Download },
      { name: 'Share', Icon: Share },
      { name: 'X', Icon: X },
      { name: 'Check', Icon: Check },
    ],
  },
  {
    label: 'Estado',
    icons: [
      { name: 'AlertCircle', Icon: AlertCircle },
      { name: 'Info', Icon: Info },
      { name: 'HelpCircle', Icon: HelpCircle },
      { name: 'Loader2', Icon: Loader2 },
      { name: 'RefreshCw', Icon: RefreshCw },
    ],
  },
  {
    label: 'Usuario',
    icons: [
      { name: 'User', Icon: User },
      { name: 'Bell', Icon: Bell },
      { name: 'Heart', Icon: Heart },
      { name: 'Star', Icon: Star },
      { name: 'Bookmark', Icon: Bookmark },
      { name: 'Eye', Icon: Eye },
      { name: 'EyeOff', Icon: EyeOff },
      { name: 'Lock', Icon: Lock },
      { name: 'Unlock', Icon: Unlock },
    ],
  },
  {
    label: 'Comunicación',
    icons: [
      { name: 'Mail', Icon: Mail },
      { name: 'Phone', Icon: Phone },
      { name: 'Globe', Icon: Globe },
      { name: 'Calendar', Icon: Calendar },
      { name: 'Clock', Icon: Clock },
    ],
  },
]

const usageCode = `import { ArrowRight, AlertCircle } from 'lucide-react'

// Tamaño estándar (16px)
<ArrowRight className="w-4 h-4" />

// Con color semántico
<AlertCircle className="w-4 h-4 text-destructive" />

// En botón
<button className="flex items-center gap-2">
  Continuar <ArrowRight className="w-4 h-4" />
</button>`

export default function IconsPage() {
  return (
    <ComponentDoc
      name="Iconografía"
      description="Sistema de iconos basado en Lucide React — 1000+ iconos consistentes y accesibles."
      tabs={[
        {
          id: 'design',
          label: 'Diseño',
          content: (
            <div className="space-y-6">
              {iconGroups.map(group => (
                <div key={group.label}>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">{group.label}</h3>
                  <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
                    {group.icons.map(({ name, Icon }) => (
                      <div key={name} className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-border bg-card hover:border-accent/50 transition-colors group">
                        <Icon className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                        <span className="text-xs text-muted-foreground text-center leading-tight">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ),
        },
        {
          id: 'build',
          label: 'Desarrollo',
          content: (
            <div className="space-y-6">
              <div className="p-4 rounded-lg border border-border bg-muted/30 text-sm text-muted-foreground">
                <strong className="text-foreground">Librería:</strong> lucide-react — instalada en el proyecto.
                Todos los iconos son SVGs optimizados, accesibles y tree-shakeable.
              </div>
              <CodeBlock code={usageCode} language="tsx" filename="Uso de iconos" />
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Tamaños estándar</h3>
                <div className="flex items-end gap-6 p-4 border border-border rounded-lg bg-card">
                  {[['w-3 h-3', '12px'], ['w-4 h-4', '16px'], ['w-5 h-5', '20px'], ['w-6 h-6', '24px'], ['w-8 h-8', '32px']].map(([cls, size]) => (
                    <div key={cls} className="flex flex-col items-center gap-1">
                      <Settings className={`${cls} text-foreground`} />
                      <span className="text-xs font-mono text-muted-foreground">{size}</span>
                      <span className="text-xs text-muted-foreground">{cls.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ),
        },
        {
          id: 'content',
          label: 'Contenido',
          content: (
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-foreground font-semibold">Guías de uso</h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li>Los iconos acompañan al texto, nunca lo reemplazan en acciones críticas.</li>
                <li>Usa <code className="text-accent bg-muted px-1 rounded">aria-label</code> cuando el icono es el único indicador de la acción.</li>
                <li>El tamaño estándar en UI es <strong className="text-foreground">w-4 h-4 (16px)</strong>.</li>
                <li>En botones, el icono va siempre a la derecha del texto para acciones de avance.</li>
              </ul>
            </div>
          ),
        },
      ]}
    />
  )
}
