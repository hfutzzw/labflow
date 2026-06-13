import { Conference } from '@/types'
import { cn, getDdlUrgency, safeFormatDate, safeDaysUntil } from '@/lib/utils'
import { Calendar, Globe, MapPin, Clock } from 'lucide-react'

interface ConferenceCardProps {
  conference: Conference
  className?: string
}

export default function ConferenceCard({ conference, className }: ConferenceCardProps) {
  const daysRemaining = safeDaysUntil(conference.fullPaperDeadline)
  const urgency = getDdlUrgency(daysRemaining)

  const urgencyStyles = {
    normal: 'border-border',
    warning: 'border-amber-200 bg-amber-50/30',
    critical: 'border-red-200 bg-red-50/30 ddl-critical',
    expired: 'border-slate-200 bg-slate-50/50 opacity-70',
  }

  const daysBadgeStyle = {
    normal: 'bg-blue-50 text-blue-700',
    warning: 'bg-amber-100 text-amber-800',
    critical: 'bg-red-100 text-red-700',
    expired: 'bg-slate-200 text-slate-500',
  }

  return (
    <div className={cn(
      'p-5 bg-card rounded-xl border card-hover',
      urgencyStyles[urgency],
      className
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold text-foreground">{conference.name} {conference.year}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">
              {conference.field}
            </span>
            <span className={cn(
              'text-[11px] px-1.5 py-0.5 rounded font-bold',
              conference.ccfLevel === 'A' ? 'bg-red-50 text-red-600 border border-red-200' :
              conference.ccfLevel === 'B' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
              'bg-slate-50 text-slate-500 border border-slate-200'
            )}>
              CCF-{conference.ccfLevel}
            </span>
          </div>
        </div>
        <div className={cn(
          'flex flex-col items-center justify-center min-w-[56px] px-3 py-2 rounded-xl text-center',
          daysBadgeStyle[urgency]
        )}>
          <span className="text-lg font-bold leading-none">{daysRemaining}</span>
          <span className="text-[10px] mt-0.5 font-medium">天</span>
        </div>
      </div>

      {/* Deadlines */}
      <div className="space-y-2 mb-3 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>Abstract: {safeFormatDate(conference.abstractDeadline)}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>Full Paper: <span className={cn(
            urgency === 'critical' ? 'text-red-600 font-semibold' :
            urgency === 'warning' ? 'text-amber-600 font-semibold' : ''
          )}>{safeFormatDate(conference.fullPaperDeadline)}</span></span>
        </div>
        {conference.supplementaryDeadline && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>Supplementary: {safeFormatDate(conference.supplementaryDeadline)}</span>
          </div>
        )}
      </div>

      {/* Location */}
      <div className="flex items-center gap-4 text-[10px] text-muted-foreground mb-3">
        {conference.location && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {conference.location}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        {conference.website ? (
          <a
            href={conference.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-primary hover:underline font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            <Globe className="w-3 h-3" />
            官网
          </a>
        ) : <span />}
        {urgency === 'expired' && (
          <span className="text-[11px] font-medium text-slate-400">已截止</span>
        )}
        {urgency === 'critical' && (
          <span className="text-[11px] font-semibold text-red-600">⚠ 即将截止</span>
        )}
      </div>
    </div>
  )
}
