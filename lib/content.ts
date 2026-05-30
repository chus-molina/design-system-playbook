import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const FIGMA_FILE_KEY = '0jMlITHtt6o1CYjjvepR0N'
const FIGMA_BASE_URL = `https://www.figma.com/design/${FIGMA_FILE_KEY}`

export interface PageContent {
  title: string
  description: string
  figmaUrl: string | null
  sections: {
    design: string
    build: string
    content: string
  }
}

function extractSections(markdown: string): { design: string; build: string; content: string } {
  const designMatch = markdown.match(/## design\n([\s\S]*?)(?=## build|## content|$)/i)
  const buildMatch = markdown.match(/## build\n([\s\S]*?)(?=## design|## content|$)/i)
  const contentMatch = markdown.match(/## content\n([\s\S]*?)(?=## design|## build|$)/i)

  return {
    design: designMatch?.[1]?.trim() ?? '',
    build: buildMatch?.[1]?.trim() ?? '',
    content: contentMatch?.[1]?.trim() ?? '',
  }
}

export function getPageContent(category: string, slug: string): PageContent | null {
  const filePath = path.join(process.cwd(), 'content', category, `${slug}.md`)

  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const figmaNodeId = data.figmaNodeId as string | undefined
  const figmaUrl = figmaNodeId
    ? `${FIGMA_BASE_URL}/HeroUI-Figma-Kit--Community-?node-id=${figmaNodeId}&t=OjFe5BIgvZKQwgNQ-0`
    : null

  return {
    title: data.title ?? slug,
    description: data.description ?? '',
    figmaUrl,
    sections: extractSections(content),
  }
}
