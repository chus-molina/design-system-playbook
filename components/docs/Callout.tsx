import { AlertCircle, Info, Lightbulb, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

type CalloutType = 'tip' | 'info' | 'warning' | 'danger'

const config: Record<CalloutType, { icon: React.ReactNode; wrap: string; title: string }> = {
  tip:     { icon: <Lightbulb className="w-4 h-4" />, wrap: 'bg-green-500/5 border-green-500/25',  title: 'text-green-700 dark:text-green-400' },
  info:    { icon: <Info className="w-4 h-4" />,      wrap: 'bg-accent/5 border-accent/25',         title: 'text-accent' },
  warning: { icon: <AlertTriangle className="w-4 h-4" />, wrap: 'bg-yellow-500/5 border-yellow-500/25', title: 'text-yellow-700 dark:text-yellow-400' },
  danger:  { icon: <AlertCircle className="w-4 h-4" />,   wrap: 'bg-red-500/5 border-red-500/25',   title: 'text-red-700 dark:text-red-400' },
}

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const { icon, wrap, title: titleCls } = config[type]
  return (
    <div className={cn('my-5 flex gap-3 rounded-xl border p-4', wrap)}>
      <div className={cn('mt-0.5 flex-shrink-0', titleCls)}>{icon}</div>
      <div>
        {title && <p className={cn('text-sm font-semibold mb-1', titleCls)}>{title}</p>}
        <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
      </div>
    </div>
  )
}
