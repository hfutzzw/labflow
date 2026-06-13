import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string; value: string | number; icon: LucideIcon
  trend?: 'up' | 'down' | 'neutral'; trendValue?: string
  className?: string
  color?: 'blue' | 'sky' | 'green' | 'amber' | 'red' | 'violet'
}

const colors = {
  blue:   { icon: 'text-blue-600',  bg: 'bg-blue-50' },
  sky:    { icon: 'text-sky-600',   bg: 'bg-sky-50' },
  green:  { icon: 'text-emerald-600', bg: 'bg-emerald-50' },
  amber:  { icon: 'text-amber-600', bg: 'bg-amber-50' },
  red:    { icon: 'text-red-600',   bg: 'bg-red-50' },
  violet: { icon: 'text-violet-600', bg: 'bg-violet-50' },
}

export default function StatCard({ label, value, icon: Icon, trend, trendValue, className, color = 'blue' }: StatCardProps) {
  const c = colors[color]
  return (
    <div className={cn('flex items-center gap-4 p-5 bg-white rounded-2xl card-hover', className)}>
      <div className={cn('flex items-center justify-center w-11 h-11 rounded-2xl', c.bg)}>
        <Icon className={cn('w-5 h-5', c.icon)} />
      </div>
      <div>
        <p className="text-sm text-slate-500 mb-0.5">{label}</p>
        <p className="text-[32px] font-bold tracking-tight text-slate-900">{value}</p>
        {trendValue && <p className="text-xs text-slate-400 mt-0.5">{trendValue}</p>}
      </div>
    </div>
  )
}
