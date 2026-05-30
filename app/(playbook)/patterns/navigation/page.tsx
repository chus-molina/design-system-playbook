import { DocPage, SectionTitle, SubTitle, DocText, CodeInline } from '@/components/docs/DocPage'
import { Preview } from '@/components/docs/Preview'
import { UsageRule } from '@/components/docs/UsageRule'
import { CodeBlock } from '@/components/docs/CodeBlock'

const FIGMA_URL = 'https://www.figma.com/design/0jMlITHtt6o1CYjjvepR0N/HeroUI-Figma-Kit--Community-?node-id=0-1'

const toc = [
  { id: 'sidebar', label: 'Sidebar', level: 2 },
  { id: 'breadcrumbs', label: 'Breadcrumbs', level: 2 },
  { id: 'reglas', label: 'Reglas', level: 2 },
]

export default function NavigationPage() {
  return (
    <DocPage
      title="Navegación"
      description="Patrones de navegación: sidebar colapsable, breadcrumbs y tabs. La navegación debe comunicar siempre dónde está el usuario y cómo llegar a otro sitio."
      figmaUrl={FIGMA_URL}
      toc={toc}
    >
      <SectionTitle id="sidebar">Sidebar</SectionTitle>
      <DocText>El sidebar de este playbook usa secciones colapsables con el ítem activo destacado en color y peso.</DocText>
      <Preview>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex w-full max-w-lg" style={{ height: 240 }}>
          <aside className="w-44 border-r border-slate-200 bg-slate-50 p-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase">Foundations</div>
            {['Colores', 'Tipografía', 'Espaciado'].map((it, i) => (
              <div key={it} className={`px-3 py-1.5 rounded-md text-sm ${i === 0 ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-500'}`}>{it}</div>
            ))}
            <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase mt-2">Components</div>
            {['Button', 'Input', 'Card'].map(it => (
              <div key={it} className="px-3 py-1.5 rounded-md text-sm text-slate-500">{it}</div>
            ))}
          </aside>
          <div className="flex-1 p-4">
            <div className="h-4 bg-slate-100 rounded w-24 mb-2" />
            <div className="h-3 bg-slate-100 rounded w-full mb-1.5" />
            <div className="h-3 bg-slate-100 rounded w-3/4" />
          </div>
        </div>
      </Preview>

      <SectionTitle id="breadcrumbs">Breadcrumbs</SectionTitle>
      <DocText>Muestran la ruta jerárquica hasta la página actual. El último elemento es la página actual y no es clickable.</DocText>
      <Preview>
        <nav className="flex items-center gap-1 text-sm">
          <span className="text-slate-400">Playbook</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-400">Components</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-medium">Button</span>
        </nav>
      </Preview>

      <SectionTitle id="reglas">Reglas</SectionTitle>
      <UsageRule
        useWhen={[
          'Los ítems de nav son sustantivos: "Configuración", no "Ir a configuración"',
          'La sección activa es visualmente inequívoca (color + peso)',
          'Anidamiento máximo de 2 niveles',
          'Breadcrumbs en jerarquías de 3+ niveles de profundidad',
        ]}
        avoidWhen={[
          'No uses más de 2 niveles de anidamiento en el sidebar',
          'No dupliques la navegación principal en varios sitios',
          'El último breadcrumb nunca es un enlace',
          'No uses iconos sin label en navegación principal',
        ]}
      />

      <CodeBlock
        filename="Sidebar colapsable (fragmento)"
        language="tsx"
        code={`function NavSection({ item }: { item: NavItem }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(
    item.children?.some(c => c.href === pathname) ?? false
  )

  if (!item.children) {
    return (
      <Link href={item.href!} className={
        item.href === pathname
          ? 'bg-accent/10 text-accent font-medium'
          : 'text-muted-foreground hover:text-foreground'
      }>
        {item.label}
      </Link>
    )
  }
  // ...sección colapsable con children
}`}
      />
    </DocPage>
  )
}
