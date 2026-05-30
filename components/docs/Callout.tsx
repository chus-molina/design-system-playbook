import { AlertCircle, Info, Lightbulb, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

type CalloutType = 'tip' | 'info' | 'warning' | 'danger'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}

const config: Record<CalloutType, { icon: React.ReactNode; classes: string; titleClass: string }> = {
  tip: {
    icon: <Lightbulb className="w-4 h-4" />,
    classes: 'bg-green-500/5 border-green-500/30 text-green-800 dark:text-green-300',
    titleClass: 'text-green-700 dark:text-green-400',
  },
  info: {
    icon: <Info className="w-4 h-4" />,
    classes: 'bg-accent/5 border-accent/30 text-foreground',
    titleClass: 'text-accent',
  },
  warning: {
    icon: <AlertTriangle className="w-4 h-4" />,
    classes: 'bg-yellow-500/5 border-yellow-500/30 text-yellow-800 dark:text-yellow-300',
    titleClass: 'text-yellow-700 dark:text-yellow-400',
  },
  danger: {
    icon: <AlertCircle className="w-4 h-4" />,
    classes: 'bg-red-500/5 border-red-500/30 text-red-800 dark:text-red-300',
    titleClass: 'text-red-700 dark:text-red-400',
  },
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const { icon, classes, titleClass } = config[type]

  return (
    <div className={cn('my-5 flex gap-3 rounded-xl border p-4 text-sm', classes)}>
      <div className={cn('mt-0.5 flex-shrink-0', titleClass)}>{icon}</div>
      <div className="space-y-1">
        {title && <p className={cn('font-semibold', titleClass)}>{title}</p>}
        <div className="text-sm leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  )
}
