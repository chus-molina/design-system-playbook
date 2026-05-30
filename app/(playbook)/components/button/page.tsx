import { getMdxPage } from '@/lib/mdx'
import { MdxPage } from '@/components/docs/MdxPage'
import { notFound } from 'next/navigation'

export default function ButtonPage() {
  const meta = getMdxPage('components', 'button')
  if (!meta) notFound()
  return <MdxPage meta={meta} />
}
