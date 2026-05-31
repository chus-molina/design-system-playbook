interface TokenLevel {
  token: string
  type: 'Component-specific token' | 'Alias token' | 'Global token' | 'Value'
  swatch: string
}

interface TokenChainProps {
  title?: string
  levels: TokenLevel[]
}

export function TokenChain({ title, levels }: TokenChainProps) {
  return (
    <div className="my-6">
      {title && <p className="text-sm font-semibold text-foreground mb-4">{title}</p>}
      <div className="relative">
        {levels.map((level, i) => (
          <div key={i} className="relative flex items-center gap-4">
            {/* Línea conectora vertical */}
            {i < levels.length - 1 && (
              <span
                className="absolute left-[18px] top-1/2 w-px bg-border"
                style={{ height: 'calc(100% )' }}
                aria-hidden
              />
            )}

            {/* Caja del token */}
            <div className="relative z-10 my-1.5 inline-flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 shadow-sm">
              <span
                className="w-5 h-5 rounded-md border border-black/5 flex-shrink-0"
                style={{ background: level.swatch }}
              />
              <code className="text-sm font-mono text-foreground">{level.token}</code>
            </div>

            {/* Etiqueta del tipo */}
            <span className="text-sm text-accent font-medium">{level.type}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
