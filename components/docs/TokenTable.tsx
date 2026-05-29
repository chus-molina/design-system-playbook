interface Token {
  name: string
  value: string
  preview?: string
  description?: string
}

interface TokenTableProps {
  tokens: Token[]
  title?: string
}

export function TokenTable({ tokens, title }: TokenTableProps) {
  return (
    <div className="space-y-3">
      {title && <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">{title}</h3>}
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Token</th>
              <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Valor</th>
              {tokens.some(t => t.preview) && (
                <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Preview</th>
              )}
              {tokens.some(t => t.description) && (
                <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Descripción</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tokens.map(token => (
              <tr key={token.name} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-2.5 font-mono text-accent text-xs">{token.name}</td>
                <td className="px-4 py-2.5 font-mono text-muted-foreground text-xs">{token.value}</td>
                {tokens.some(t => t.preview) && (
                  <td className="px-4 py-2.5">
                    {token.preview && (
                      <div
                        className="w-8 h-8 rounded border border-border"
                        style={{ background: token.preview }}
                      />
                    )}
                  </td>
                )}
                {tokens.some(t => t.description) && (
                  <td className="px-4 py-2.5 text-muted-foreground">{token.description}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
