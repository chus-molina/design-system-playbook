import { Check, X } from 'lucide-react'

interface DoProps {
  label?: string
  children: React.ReactNode
}

interface DontProps {
  label?: string
  children: React.ReactNode
}

export function Do({ label = 'Hazlo así', children }: DoProps) {
  return (
    <div className="flex-1 min-w-0 rounded-xl border-2 border-green-500/30 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-green-500/10 border-b border-green-500/20">
        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
          <Check className="w-3 h-3 text-white" />
        </div>
        <span className="text-sm font-semibold text-green-700 dark:text-green-400">{label}</span>
      </div>
      <div className="p-6 flex flex-wrap items-center justify-center gap-3 bg-card min-h-[100px]">
        {children}
      </div>
    </div>
  )
}

export function Dont({ label = 'Evita esto', children }: DontProps) {
  return (
    <div className="flex-1 min-w-0 rounded-xl border-2 border-red-500/30 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border-b border-red-500/20">
        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
          <X className="w-3 h-3 text-white" />
        </div>
        <span className="text-sm font-semibold text-red-700 dark:text-red-400">{label}</span>
      </div>
      <div className="p-6 flex flex-wrap items-center justify-center gap-3 bg-card min-h-[100px]">
        {children}
      </div>
    </div>
  )
}

interface DoDontProps {
  children: React.ReactNode
  description?: string
}

export function DoDont({ children, description }: DoDontProps) {
  return (
    <div className="my-6 space-y-3">
      <div className="flex gap-4 flex-col sm:flex-row">
        {children}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground px-1">{description}</p>
      )}
    </div>
  )
}
