import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string; value: string | number; icon: LucideIcon
  trend?: 'up' | 'down' | 'neutral'; trendValue?: string
  className?: string
  color?: 'indigo' | 'sky' | 'emerald' | 'amber' | 'red' | 'violet'
}

const colorMap = {
  indigo:  { icon: 'text-indigo-600',  bg: 'bg-indigo-50',  light: 'bg-indigo-50/50' },
  sky:     { icon: 'text-sky-600',     bg: 'bg-sky-50',     light: 'bg-sky-50/50' },
  emerald: { icon: 'text-emerald-600', bg: 'bg-emerald-50', light: 'bg-emerald-50/50' },
  amber:   { icon: 'text-amber-600',   bg: 'bg-amber-50',   light: 'bg-amber-50/50' },
  red:     { icon: 'text-red-600',     bg: 'bg-red-50',     light: 'bg-red-50/50' },
  violet:  { icon: 'text-violet-600',  bg: 'bg-violet-50',  light: 'bg-violet-50/50' },
}

export default function StatCard({ label, value, icon: Icon, trend, trendValue, className, color = 'indigo' }: StatCardProps) {
  const c = colorMap[color]
  const tc = trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-500' : 'text-slate-400'

  return (
    <div className={cn('relative flex items-start gap-4 p-[18px] bg-white rounded-2xl border border-slate-100 card-hover', className)}>
      <div className={cn('flex items-center justify-center w-[42px] h-[42px] rounded-2xl shrink-0', c.bg)}>
        <Icon className={cn('w-[19px] h-[19px]', c.icon)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</p>
        <p className="text-[28px] font-bold tracking-[-0.02em] text-slate-900 leading-none">{value}</p>
        {trendValue && <p className={cn('text-xs font-medium mt-2', tc)}>{trendValue}</p>}
      </div>
    </div>
  )
}
