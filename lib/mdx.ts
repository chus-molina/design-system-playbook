import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const FIGMA_FILE_KEY = '0jMlITHtt6o1CYjjvepR0N'
const FIGMA_BASE = `https://www.figma.com/design/${FIGMA_FILE_KEY}/HeroUI-Figma-Kit--Community-`

export interface MdxPageMeta {
  title: string
  description: string
  figmaUrl: string | null
  toc: { id: string; label: string; level: number }[]
  source: string
}

export function getMdxPage(category: string, slug: string): MdxPageMeta | null {
  const filePath = path.join(process.cwd(), 'content', category, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const figmaNodeId = data.figmaNodeId as string | undefined
  const figmaUrl = figmaNodeId
    ? `${FIGMA_BASE}?node-id=${figmaNodeId}&t=OjFe5BIgvZKQwgNQ-0`
    : null

  // Extract TOC from headings
  const toc: { id: string; label: string; level: number }[] = []
  const headingRe = /^(#{2,3})\s+(.+)$/gm
  let match
  while ((match = headingRe.exec(content)) !== null) {
    const level = match[1].length
    const label = match[2].trim()
    const id = label
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
    toc.push({ id, label, level })
  }

  return {
    title: data.title ?? slug,
    description: data.description ?? '',
    figmaUrl,
    toc,
    source: content,
  }
}
