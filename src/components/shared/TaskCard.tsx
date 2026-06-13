import { Task, TASK_TYPE_LABELS, TASK_STATUS_LABELS, PRIORITY_LABELS, TaskStatus } from '@/types'
import { cn, getTaskTypeIcon } from '@/lib/utils'
import ProgressBar from './ProgressBar'
import { Calendar, User, ChevronRight, ChevronLeft } from 'lucide-react'
import { format } from 'date-fns'

interface TaskCardProps {
  task: Task; assigneeName?: string; projectTitle?: string
  className?: string; onClick?: () => void
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void
}

const statusFlow: Record<TaskStatus, { next: TaskStatus | null; label: string }> = {
  todo: { next: 'in_progress', label: '开始' },
  in_progress: { next: 'done', label: '完成' },
  done: { next: 'todo', label: '重开' },
  blocked: { next: 'in_progress', label: '解除' },
  pending_feedback: { next: 'in_progress', label: '继续' },
}

const priorityBorder = { low: 'border-l-slate-300', medium: 'border-l-sky-400', high: 'border-l-amber-400', urgent: 'border-l-red-500' }

export default function TaskCard({ task, assigneeName, className, onClick, onStatusChange }: TaskCardProps) {
  return (
    <div onClick={onClick} className={cn(
      'p-3.5 bg-white rounded-xl border border-slate-200 border-l-[3px] card-hover cursor-pointer group',
      priorityBorder[task.priority], className
    )}>
      <div className="flex items-start gap-2 mb-2">
        <span className="text-sm shrink-0 mt-0.5">{getTaskTypeIcon(task.type)}</span>
        <div className="min-w-0 flex-1">
          <h4 className="text-[13px] font-medium text-slate-900 leading-snug line-clamp-2">{task.title}</h4>
          <span className="text-[10px] text-slate-400">{TASK_TYPE_LABELS[task.type]}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2 flex-wrap">
        {assigneeName && <span className="flex items-center gap-1"><User className="w-3 h-3" />{assigneeName}</span>}
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{format(new Date(task.dueDate), 'MM/dd')}</span>
        {task.isDelayed && <span className="text-red-500 font-semibold">已延期</span>}
      </div>
      {task.status !== 'done' && <ProgressBar value={task.progress} size="sm" className="mb-2" />}

      {/* Status + Quick actions */}
      <div className="flex items-center justify-between">
        <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded', task.status === 'done' ? 'bg-emerald-50 text-emerald-600' : task.status === 'in_progress' ? 'bg-sky-50 text-sky-600' : 'bg-slate-100 text-slate-500')}>
          {TASK_STATUS_LABELS[task.status]}
        </span>
        <div className="flex items-center gap-1">
          <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded',
            task.priority === 'urgent' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600')}>
            {PRIORITY_LABELS[task.priority]}
          </span>
          {/* Quick status toggle */}
          {onStatusChange && statusFlow[task.status].next && (
            <button
              onClick={e => { e.stopPropagation(); onStatusChange(task.id, statusFlow[task.status].next!) }}
              className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 hover:bg-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity font-medium"
            >
              {statusFlow[task.status].label} →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
