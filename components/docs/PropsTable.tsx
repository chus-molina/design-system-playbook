export interface PropDef {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

export function PropsTable({ items }: { items: PropDef[] }) {
  return (
    <div className="my-5 border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 bg-muted border-b border-border flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Props</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">Prop</th>
              <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">Tipo</th>
              <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">Default</th>
              <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">Descripción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map(prop => (
              <tr key={prop.name} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  <code className="text-xs font-mono text-accent">{prop.name}</code>
                  {prop.required && <span className="ml-1 text-red-500 text-xs">*</span>}
                </td>
                <td className="px-4 py-3">
                  <code className="text-xs font-mono bg-muted text-muted-foreground px-1.5 py-0.5 rounded">{prop.type}</code>
                </td>
                <td className="px-4 py-3">
                  {prop.default
                    ? <code className="text-xs font-mono text-muted-foreground">{prop.default}</code>
                    : <span className="text-muted-foreground/40 text-xs">—</span>
                  }
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground leading-relaxed">{prop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
