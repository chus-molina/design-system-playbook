import { ComponentDoc } from '@/components/docs/ComponentDoc'
import { CodeBlock } from '@/components/docs/CodeBlock'

const sidebarCode = `// Patrón de sidebar colapsable
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

function NavSection({ item }: { item: NavItem }) {
  const pathname = usePathname()
  const isActive = item.href === pathname
  const [open, setOpen] = useState(
    item.children?.some(c => c.href === pathname) ?? false
  )

  if (!item.children) {
    return (
      <Link
        href={item.href!}
        className={isActive
          ? 'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-accent/10 text-accent font-medium'
          : 'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted'
        }
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        {item.label}
        {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </button>
      {open && (
        <div className="ml-4 border-l border-border pl-2 mt-0.5 space-y-0.5">
          {item.children.map(child => (
            <NavSection key={child.label} item={child} />
          ))}
        </div>
      )}
    </div>
  )
}`

export default function NavigationPage() {
  return (
    <ComponentDoc
      name="Navegación"
      description="Patrones para sidebar, breadcrumbs y navegación por tabs."
      tabs={[
        {
          id: 'design',
          label: 'Diseño',
          content: (
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Sidebar (este playbook)</h2>
                <div className="border border-border rounded-xl overflow-hidden flex" style={{ height: 280 }}>
                  <aside className="w-48 border-r border-border bg-muted/30 p-3 space-y-1">
                    <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase">Foundations</div>
                    {['Colores','Tipografía','Espaciado'].map((item, i) => (
                      <div key={item} className={`px-3 py-1.5 rounded-md text-sm ${i === 0 ? 'bg-accent/10 text-accent font-medium' : 'text-muted-foreground'}`}>
                        {item}
                      </div>
                    ))}
                    <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">Components</div>
                    {['Button','Input','Card'].map(item => (
                      <div key={item} className="px-3 py-1.5 rounded-md text-sm text-muted-foreground">{item}</div>
                    ))}
                  </aside>
                  <div className="flex-1 p-4">
                    <div className="h-4 bg-muted rounded w-24 mb-2" />
                    <div className="h-3 bg-muted rounded w-full mb-1.5" />
                    <div className="h-3 bg-muted rounded w-3/4" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Breadcrumbs</h2>
                <div className="p-4 rounded-xl border border-border bg-card">
                  <nav className="flex items-center gap-1 text-sm">
                    <span className="text-muted-foreground">Playbook</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-muted-foreground">Components</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-foreground font-medium">Button</span>
                  </nav>
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
              <CodeBlock code={sidebarCode} language="tsx" filename="components/layout/Sidebar.tsx (fragmento)" />
            </div>
          ),
        },
        {
          id: 'content',
          label: 'Contenido',
          content: (
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-foreground font-semibold">Labels de navegación</h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li>Los ítems de nav son sustantivos, no frases: "Configuración" no "Ir a configuración".</li>
                <li>La sección activa es visualmente inequívoca (color + peso tipográfico).</li>
                <li>El anidamiento máximo es 2 niveles — más profundidad confunde.</li>
              </ul>
            </div>
          ),
        },
      ]}
    />
  )
}
