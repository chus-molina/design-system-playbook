interface Prop {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

interface PropsTableProps {
  items: Prop[]
}

export function PropsTable({ items }: PropsTableProps) {
  return (
    <div className="my-6 border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 bg-muted border-b border-border">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Props</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Prop</th>
              <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Tipo</th>
              <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Default</th>
              <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Descripción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map(prop => (
              <tr key={prop.name} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <span className="font-mono text-xs text-accent">{prop.name}</span>
                  {prop.required && (
                    <span className="ml-1 text-red-500 text-xs">*</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                    {prop.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {prop.default ? (
                    <span className="font-mono text-xs text-muted-foreground">{prop.default}</span>
                  ) : (
                    <span className="text-muted-foreground/50 text-xs">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs leading-relaxed">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
