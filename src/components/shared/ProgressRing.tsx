import { cn } from '@/lib/utils'

interface ProgressRingProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  label?: string
  className?: string
}

export default function ProgressRing({ value, max = 100, size = 48, strokeWidth = 4, label, className }: ProgressRingProps) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)))
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (pct / 100) * circumference

  const color = pct >= 80 ? '#10b981' : pct >= 50 ? '#3b82f6' : pct >= 30 ? '#f59e0b' : '#d1d5db'

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
      </div>
      {label && <span className="text-[10px] text-muted-foreground mt-0.5">{label}</span>}
    </div>
  )
}
