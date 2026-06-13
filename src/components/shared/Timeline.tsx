import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CheckCircle2, XCircle, Circle, Clock } from 'lucide-react'

interface TimelineItem {
  id: string
  title: string
  description?: string
  date: string
  type?: 'success' | 'failure' | 'neutral' | 'pending'
  meta?: { label: string; value: string | number }[]
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

const typeConfig = {
  success: { icon: CheckCircle2, bg: 'bg-emerald-50', border: 'border-emerald-200', iconColor: 'text-emerald-500' },
  failure: { icon: XCircle, bg: 'bg-red-50', border: 'border-red-200', iconColor: 'text-red-400' },
  neutral: { icon: Circle, bg: 'bg-blue-50', border: 'border-blue-200', iconColor: 'text-blue-500' },
  pending: { icon: Clock, bg: 'bg-amber-50', border: 'border-amber-200', iconColor: 'text-amber-500' },
}

export default function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Vertical line */}
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />

      <div className="space-y-3">
        {items.map((item, i) => {
          const config = typeConfig[item.type || 'neutral']
          const Icon = config.icon

          return (
            <div key={item.id} className="relative pl-10">
              {/* Dot */}
              <div className={cn(
                'absolute left-1 top-1 flex items-center justify-center w-7 h-7 rounded-full border-2 bg-card',
                config.border, config.bg
              )}>
                <Icon className={cn('w-3.5 h-3.5', config.iconColor)} />
              </div>

              {/* Content */}
              <div className="p-3 rounded-lg bg-card border border-border hover:border-border/80 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-medium text-foreground leading-snug">{item.title}</h4>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {format(new Date(item.date), 'MM/dd')}
                  </span>
                </div>
                {item.description && (
                  <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                )}
                {item.meta && item.meta.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.meta.map((m, j) => (
                      <span key={j} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground">
                        <span className="font-medium">{m.label}:</span>
                        <span className="font-semibold text-foreground">{m.value}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
