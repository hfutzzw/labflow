import { Project, PROJECT_STAGE_LABELS } from '@/types'
import { cn, relativeTime, getProjectStageIcon } from '@/lib/utils'
import RiskBadge from './RiskBadge'
import ProgressBar from './ProgressBar'
import { Calendar, Users2, Lightbulb, Target } from 'lucide-react'

interface ProjectCardProps {
  project: Project
  leadName?: string
  participantNames?: string[]
  conferenceName?: string
  onClick?: () => void
  className?: string
}

export default function ProjectCard({ project, leadName, participantNames, conferenceName, onClick, className }: ProjectCardProps) {
  const stageLabel = PROJECT_STAGE_LABELS[project.stage]

  return (
    <div
      onClick={onClick}
      className={cn(
        'p-5 bg-card rounded-xl border border-border card-hover cursor-pointer',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-lg shrink-0">{getProjectStageIcon(project.stage)}</span>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
              {project.title}
            </h3>
          </div>
        </div>
        <RiskBadge level={project.riskLevel} className="shrink-0 ml-2" />
      </div>

      {/* Stage badge */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
          {stageLabel}
        </span>
        {conferenceName && (
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Target className="w-3 h-3" />
            {conferenceName}
          </span>
        )}
      </div>

      {/* People */}
      <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
        {leadName && (
          <span className="flex items-center gap-1">
            <Users2 className="w-3 h-3" />
            负责人：{leadName}
          </span>
        )}
        {participantNames && participantNames.length > 0 && (
          <span>参与：{participantNames.join('、')}</span>
        )}
      </div>

      {/* Contribution */}
      <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
        <Lightbulb className="w-3 h-3 inline mr-1 shrink-0" />
        {project.coreContribution}
      </p>

      {/* Progress bars */}
      <div className="space-y-2 mb-3">
        <ProgressBar value={project.experimentProgress} label="实验" size="sm" />
        <ProgressBar value={project.writingProgress} label="写作" size="sm" />
      </div>

      {/* Risk & Next step */}
      {project.currentRisk && (
        <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-100 text-xs text-amber-800 mb-2">
          ⚠️ {project.currentRisk}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <span className="text-[10px] text-muted-foreground">
          更新于 {relativeTime(project.updatedAt)}
        </span>
        {project.nextStep && (
          <span className="text-[10px] font-medium text-primary truncate ml-2 max-w-[60%]">
            → {project.nextStep}
          </span>
        )}
      </div>
    </div>
  )
}
