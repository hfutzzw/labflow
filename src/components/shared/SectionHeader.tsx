import { cn } from '@/lib/utils'
import { Divide } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export default function SectionHeader({ title, description, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      <div>
        <h2 className="text-sm font-semibold text-foreground tracking-tight">{title}</h2>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
