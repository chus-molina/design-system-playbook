import { DocPage, SectionTitle, DocText, CodeInline } from '@/components/docs/DocPage'
import { CodeBlock } from '@/components/docs/CodeBlock'

const FIGMA_URL = 'https://www.figma.com/design/0jMlITHtt6o1CYjjvepR0N/HeroUI-Figma-Kit--Community-?node-id=0-1'

const toc = [
  { id: 'escala', label: 'Escala', level: 2 },
  { id: 'pesos', label: 'Pesos', level: 2 },
  { id: 'uso', label: 'Uso', level: 2 },
  { id: 'jerarquia', label: 'Jerarquía', level: 2 },
]

const scale = [
  { cls: 'text-xs', px: '12px', use: 'Etiquetas, metadata, chips' },
  { cls: 'text-sm', px: '14px', use: 'Cuerpo secundario, UI labels' },
  { cls: 'text-base', px: '16px', use: 'Cuerpo principal' },
  { cls: 'text-lg', px: '18px', use: 'Introducción de sección' },
  { cls: 'text-xl', px: '20px', use: 'Subtítulos' },
  { cls: 'text-2xl', px: '24px', use: 'Títulos de sección' },
  { cls: 'text-3xl', px: '30px', use: 'Títulos de página' },
  { cls: 'text-4xl', px: '36px', use: 'Hero / Display' },
]

export default function TypographyPage() {
  return (
    <DocPage
      title="Tipografía"
      description="La tipografía establece jerarquía visual y facilita la lectura. El sistema usa Inter como fuente principal en todos los pesos."
      figmaUrl={FIGMA_URL}
      toc={toc}
    >
      <SectionTitle id="escala">Escala</SectionTitle>
      <div className="space-y-1 my-5">
        {scale.map(t => (
          <div key={t.cls} className="flex items-baseline gap-4 py-3 border-b border-border last:border-0">
            <span className={`${t.cls} font-medium text-foreground min-w-[200px]`}>The quick brown fox</span>
            <div className="ml-auto text-right">
              <code className="text-xs text-accent font-mono">{t.cls}</code>
              <span className="text-xs text-muted-foreground ml-2">{t.px}</span>
              <p className="text-xs text-muted-foreground">{t.use}</p>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle id="pesos">Pesos</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
        {[
          { w: 'font-normal', v: '400', use: 'Cuerpo' },
          { w: 'font-medium', v: '500', use: 'Labels, botones' },
          { w: 'font-semibold', v: '600', use: 'Subtítulos' },
          { w: 'font-bold', v: '700', use: 'Títulos' },
        ].map(p => (
          <div key={p.w} className="p-4 rounded-xl border border-border bg-card">
            <p className={`${p.w} text-lg text-foreground`}>Aa</p>
            <code className="text-xs text-accent font-mono block mt-2">{p.w}</code>
            <p className="text-xs text-muted-foreground">{p.v} · {p.use}</p>
          </div>
        ))}
      </div>

      <SectionTitle id="uso">Uso</SectionTitle>
      <CodeBlock
        filename="Uso típico"
        language="tsx"
        code={`<h1 className="text-3xl font-bold text-foreground">Título de página</h1>
<h2 className="text-xl font-semibold text-foreground">Subtítulo</h2>
<p className="text-base text-muted-foreground leading-relaxed">Cuerpo...</p>
<label className="text-sm font-medium text-foreground">Email</label>
<span className="text-xs text-muted-foreground">hace 3 horas</span>`}
      />

      <SectionTitle id="jerarquia">Jerarquía</SectionTitle>
      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground my-3">
        <li>Usa <CodeInline>h1</CodeInline> una sola vez por página.</li>
        <li>Los subtítulos (<CodeInline>h2</CodeInline>) articulan secciones, no son decoración.</li>
        <li>El cuerpo usa <CodeInline>text-base</CodeInline> con <CodeInline>leading-relaxed</CodeInline>.</li>
        <li>No saltes niveles de jerarquía (de h1 directamente a h4).</li>
      </ul>
    </DocPage>
  )
}
