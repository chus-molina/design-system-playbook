import { Check, X } from 'lucide-react'

interface UsageRuleProps {
  use: string[]
  avoid: string[]
}

export function UsageRule({ use, avoid }: UsageRuleProps) {
  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
        <p className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide mb-3">
          Úsalo cuando...
        </p>
        <ul className="space-y-2">
          {use.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
        <p className="text-xs font-semibold text-red-700 dark:text-red-400 uppercase tracking-wide mb-3">
          Evítalo cuando...
        </p>
        <ul className="space-y-2">
          {avoid.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
