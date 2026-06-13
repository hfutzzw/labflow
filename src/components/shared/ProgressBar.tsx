import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number; max?: number; label?: string; showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'; className?: string; animated?: boolean
}

function color(pct: number): string {
  if (pct >= 80) return 'bg-emerald-500'
  if (pct >= 50) return 'bg-sky-500'
  if (pct >= 30) return 'bg-amber-500'
  return 'bg-slate-300'
}

export default function ProgressBar({ value, max = 100, label, showPercentage = true, size = 'md', className, animated = true }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)))
  const height = { sm: 'h-1', md: 'h-1.5', lg: 'h-2' }

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-[11px] font-medium text-slate-600">{label}</span>}
          {showPercentage && <span className="text-[11px] font-semibold text-slate-400 tabular-nums">{pct}%</span>}
        </div>
      )}
      <div className={cn('w-full rounded-full bg-slate-100 overflow-hidden', height[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-700', color(pct), animated && 'progress-animated')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
