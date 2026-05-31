import Link from 'next/link'
import { ArrowRight, Layers, Puzzle, Layout } from 'lucide-react'
import { LogoFull } from '@/components/layout/LogoFull'

const sections = [
  {
    title: 'Foundations',
    description: 'Colores, tipografía, espaciado e iconografía — los elementos base del sistema.',
    href: '/foundations/colors',
    icon: <Layers className="w-5 h-5 text-accent" />,
    items: ['Colores', 'Tipografía', 'Espaciado', 'Iconografía'],
  },
  {
    title: 'Components',
    description: 'Componentes UI reutilizables documentados para diseño y desarrollo.',
    href: '/components/button',
    icon: <Puzzle className="w-5 h-5 text-accent" />,
    items: ['Button', 'Input', 'Card', 'Modal', 'Avatar', 'Tooltip'],
  },
  {
    title: 'Patterns',
    description: 'Patrones de composición para formularios, navegación y layouts.',
    href: '/patterns/forms',
    icon: <Layout className="w-5 h-5 text-accent" />,
    items: ['Formularios', 'Navegación', 'Layouts'],
  },
]

export default function GettingStartedPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <LogoFull className="h-7" />
          <h1 className="text-3xl font-bold text-foreground border-l border-border pl-3">Playbook</h1>
        </div>
        <p className="text-muted-foreground text-sm mb-4">Basado en HeroUI — Open Source UI Kit</p>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Bienvenido al HeroUI Playbook. Esta guía unifica el lenguaje visual y de desarrollo
          del equipo, documentando cada componente con perspectiva de diseño, desarrollo y contenido.
          Inspirado en <strong className="text-foreground">base.uber.com</strong>.
        </p>
      </div>

      <div className="grid gap-4">
        <h2 className="text-lg font-semibold text-foreground">Cómo usar este playbook</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Diseño', 'Desarrollo', 'Contenido'].map((role, i) => (
            <div key={role} className="p-4 rounded-xl border border-border bg-card space-y-2">
              <div className="text-2xl">{['🎨', '⚙️', '✍️'][i]}</div>
              <h3 className="font-semibold text-foreground">{role}</h3>
              <p className="text-sm text-muted-foreground">
                {[
                  'Consulta variantes, tokens de diseño y guías de uso para mantener consistencia visual.',
                  'Encuentra implementaciones de referencia, props disponibles y ejemplos de código listos para copiar.',
                  'Revisa pautas de redacción y microcopy para cada componente.',
                ][i]}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Explorar</h2>
        <div className="grid gap-4">
          {sections.map(section => (
            <Link key={section.title} href={section.href}>
              <div className="p-5 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-sm transition-all group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {section.icon}
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{section.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors mt-0.5" />
                </div>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {section.items.map(item => (
                    <span key={item} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl border border-border bg-muted/50 text-sm text-muted-foreground">
        <strong className="text-foreground">Fuente del sistema:</strong> Los componentes documentados
        en este playbook están basados en el archivo Figma Community de <strong className="text-foreground">HeroUI v2</strong>
        {' '}(0jMlITHtt6o1CYjjvepR0N). Todos los tokens, variantes y guías han sido extraídos y adaptados
        para uso interno del equipo.
      </div>
    </div>
  )
}
