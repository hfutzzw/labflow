import { Meeting, MeetingPresentation } from '@/types'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import StatusBadge from './StatusBadge'
import { Calendar, Clock, MapPin, Video, User, Mic } from 'lucide-react'

interface MeetingCardProps {
  meeting: Meeting
  presentations?: MeetingPresentation[]
  onPresentationClick?: (id: string) => void
  className?: string
}

export default function MeetingCard({ meeting, presentations, className }: MeetingCardProps) {
  return (
    <div className={cn('p-5 bg-card rounded-xl border border-border card-hover', className)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">
              {format(new Date(meeting.date), 'M月d日')} 组会
            </h3>
            <StatusBadge status={meeting.status} />
          </div>
          <div className="space-y-1 ml-6">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> {meeting.time}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> {meeting.location}
            </p>
            {meeting.meetingLink && (
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Video className="w-3 h-3" />
                <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  腾讯会议
                </a>
              </p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted-foreground">主持人</p>
          <p className="text-xs font-semibold text-foreground">{meeting.host}</p>
        </div>
      </div>

      {/* Presentations */}
      {presentations && presentations.length > 0 && (
        <div className="border-t border-border pt-3">
          <p className="text-[11px] font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
            <Mic className="w-3 h-3" />
            汇报安排 ({presentations.length})
          </p>
          <div className="space-y-1.5">
            {presentations
              .sort((a, b) => a.order - b.order)
              .map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <span className="text-[11px] font-bold text-muted-foreground w-5 shrink-0">
                    #{p.order}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{p.topic}</p>
                    <p className="text-[10px] text-muted-foreground">{p.estimatedDuration} 分钟</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
