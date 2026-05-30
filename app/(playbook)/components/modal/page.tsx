import { getMdxPage } from '@/lib/mdx'
import { MdxPage } from '@/components/docs/MdxPage'
import { notFound } from 'next/navigation'

export default function Page() {
  const meta = getMdxPage('components', 'modal')
  if (!meta) notFound()
  return <MdxPage meta={meta} />
}
