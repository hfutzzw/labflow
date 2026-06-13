import { cn } from '@/lib/utils'
import { RiskLevel } from '@/types'

const styles: Record<RiskLevel, string> = {
  low:      'text-emerald-700 bg-emerald-50 border-emerald-200',
  medium:   'text-amber-700 bg-amber-50 border-amber-200',
  high:     'text-orange-700 bg-orange-50 border-orange-200',
  critical: 'text-red-700 bg-red-50 border-red-200',
}

const dots: Record<RiskLevel, string> = {
  low: 'bg-emerald-500', medium: 'bg-amber-500', high: 'bg-orange-500', critical: 'bg-red-500',
}

const labels: Record<RiskLevel, string> = {
  low: '低风险', medium: '中风险', high: '高风险', critical: '极高风险',
}

export default function RiskBadge({ level, label, className }: { level: RiskLevel; label?: string; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold border', styles[level], className)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', dots[level])} />
      {label || labels[level]}
    </span>
  )
}
