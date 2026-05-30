import { MDXRemote } from 'next-mdx-remote/rsc'
import { DocLayout } from './DocLayout'
import { getMdxComponents } from '@/lib/mdx-components'
import type { MdxPageMeta } from '@/lib/mdx'

interface MdxPageProps {
  meta: MdxPageMeta
}

export function MdxPage({ meta }: MdxPageProps) {
  return (
    <DocLayout
      title={meta.title}
      description={meta.description}
      figmaUrl={meta.figmaUrl}
      toc={meta.toc}
    >
      <MDXRemote
        source={meta.source}
        components={getMdxComponents()}
      />
    </DocLayout>
  )
}
