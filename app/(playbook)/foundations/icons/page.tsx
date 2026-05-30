import { DocPage, SectionTitle, DocText, CodeInline } from '@/components/docs/DocPage'
import { CodeBlock } from '@/components/docs/CodeBlock'
import {
  Home, Settings, Search, ArrowRight, ChevronDown, Plus, Edit, Trash2,
  Upload, Download, Share, X, Check, AlertCircle, Info, HelpCircle,
  Loader2, RefreshCw, User, Bell, Heart, Star, Lock, Eye, Mail, Phone,
  Globe, Calendar, Clock,
} from 'lucide-react'

const FIGMA_URL = 'https://www.figma.com/design/0jMlITHtt6o1CYjjvepR0N/HeroUI-Figma-Kit--Community-?node-id=10-1849'

const toc = [
  { id: 'libreria', label: 'Librería', level: 2 },
  { id: 'tamanos', label: 'Tamaños', level: 2 },
  { id: 'catalogo', label: 'Catálogo', level: 2 },
  { id: 'uso', label: 'Uso', level: 2 },
]

const groups = [
  { label: 'Navegación', icons: [Home, Settings, Search, ArrowRight, ChevronDown] },
  { label: 'Acciones', icons: [Plus, Edit, Trash2, Upload, Download, Share, X, Check] },
  { label: 'Estado', icons: [AlertCircle, Info, HelpCircle, Loader2, RefreshCw] },
  { label: 'Usuario', icons: [User, Bell, Heart, Star, Lock, Eye] },
  { label: 'Comunicación', icons: [Mail, Phone, Globe, Calendar, Clock] },
]

export default function IconsPage() {
  return (
    <DocPage
      title="Iconografía"
      description="Los iconos refuerzan el significado de las acciones y el contenido. El sistema usa Lucide React por su consistencia visual y accesibilidad."
      figmaUrl={FIGMA_URL}
      toc={toc}
    >
      <SectionTitle id="libreria">Librería</SectionTitle>
      <DocText>Todos los iconos provienen de <CodeInline>lucide-react</CodeInline>: 1000+ iconos SVG optimizados, accesibles y tree-shakeable.</DocText>

      <SectionTitle id="tamanos">Tamaños</SectionTitle>
      <div className="flex items-end gap-6 p-6 rounded-xl border border-border bg-card my-5">
        {[['w-3 h-3', '12px'], ['w-4 h-4', '16px'], ['w-5 h-5', '20px'], ['w-6 h-6', '24px'], ['w-8 h-8', '32px']].map(([cls, size]) => (
          <div key={cls} className="flex flex-col items-center gap-1.5">
            <Settings className={`${cls} text-foreground`} />
            <span className="text-xs font-mono text-muted-foreground">{size}</span>
            <span className="text-[10px] text-muted-foreground">{cls.split(' ')[0]}</span>
          </div>
        ))}
      </div>

      <SectionTitle id="catalogo">Catálogo</SectionTitle>
      <div className="space-y-6 my-5">
        {groups.map(g => (
          <div key={g.label}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">{g.label}</p>
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
              {g.icons.map((Icon, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-border bg-card hover:border-accent/50 transition-colors group">
                  <Icon className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                  <span className="text-[10px] text-muted-foreground text-center leading-tight">{Icon.displayName}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SectionTitle id="uso">Uso</SectionTitle>
      <CodeBlock
        filename="Uso de iconos"
        language="tsx"
        code={`import { ArrowRight, AlertCircle } from 'lucide-react'

<ArrowRight className="w-4 h-4" />
<AlertCircle className="w-4 h-4 text-destructive" />

<button className="flex items-center gap-2">
  Continuar <ArrowRight className="w-4 h-4" />
</button>`}
      />
      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground my-3">
        <li>Tamaño estándar en UI: <CodeInline>w-4 h-4</CodeInline> (16px).</li>
        <li>Los iconos acompañan al texto, no lo reemplazan en acciones críticas.</li>
        <li>Usa <CodeInline>aria-label</CodeInline> cuando el icono es el único indicador.</li>
      </ul>
    </DocPage>
  )
}
