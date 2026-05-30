import { getPageContent } from '@/lib/content'
import { notFound } from 'next/navigation'
import { ComponentDoc } from '@/components/docs/ComponentDoc'
import { FigmaLink } from '@/components/docs/FigmaLink'
import { MarkdownContent } from '@/components/docs/MarkdownContent'

export default function Page() {
  const page = getPageContent('foundations', 'colors')
  if (!page) notFound()

  return (
    <ComponentDoc
      name={page.title}
      description={page.description}
      figmaLink={page.figmaUrl ? <FigmaLink url={page.figmaUrl} /> : null}
      tabs={[
        { id: 'design', label: 'Diseño', content: <MarkdownContent content={page.sections.design} /> },
        { id: 'build', label: 'Desarrollo', content: <MarkdownContent content={page.sections.build} /> },
        { id: 'content', label: 'Contenido', content: <MarkdownContent content={page.sections.content} /> },
      ]}
    />
  )
}
