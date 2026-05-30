interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  if (!content) return null

  // Simple markdown renderer for tables, code blocks, lists, and paragraphs
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      elements.push(
        <div key={i} className="rounded-lg overflow-hidden border border-border my-4">
          {lang && (
            <div className="px-4 py-1.5 border-b border-border bg-muted text-xs font-mono text-muted-foreground">
              {lang}
            </div>
          )}
          <pre className="p-4 overflow-x-auto text-sm font-mono" style={{ background: 'hsl(222 47% 6%)', color: 'hsl(210 40% 98%)' }}>
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      )
      i++
      continue
    }

    // Table
    if (line.startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      const headers = tableLines[0].split('|').filter(Boolean).map(h => h.trim())
      const rows = tableLines.slice(2).map(r => r.split('|').filter(Boolean).map(c => c.trim()))
      elements.push(
        <div key={i} className="my-4 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>{headers.map((h, j) => <th key={j} className="text-left px-3 py-2 text-muted-foreground font-medium">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row, j) => (
                <tr key={j} className="hover:bg-muted/30">
                  {row.map((cell, k) => (
                    <td key={k} className="px-3 py-2 text-foreground">
                      <span dangerouslySetInnerHTML={{ __html: formatInline(cell) }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-sm font-semibold text-foreground mt-5 mb-2">{line.slice(4)}</h3>)
      i++; continue
    }

    // H2
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-base font-semibold text-foreground mt-6 mb-2">{line.slice(3)}</h2>)
      i++; continue
    }

    // List item
    if (line.match(/^[-*] /)) {
      const listItems: string[] = []
      while (i < lines.length && lines[i].match(/^[-*] /)) {
        listItems.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={i} className="list-disc list-inside space-y-1 my-3 text-sm text-muted-foreground">
          {listItems.map((item, j) => (
            <li key={j}><span dangerouslySetInnerHTML={{ __html: formatInline(item) }} /></li>
          ))}
        </ul>
      )
      continue
    }

    // Empty line
    if (line.trim() === '') { i++; continue }

    // Paragraph
    elements.push(
      <p key={i} className="text-sm text-muted-foreground leading-relaxed my-2">
        <span dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      </p>
    )
    i++
  }

  return <div className="space-y-1">{elements}</div>
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-medium">$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="text-accent bg-muted px-1 rounded text-xs font-mono">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent underline" target="_blank">$1</a>')
}
