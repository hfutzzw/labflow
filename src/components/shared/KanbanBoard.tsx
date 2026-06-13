'use client'

import { Task, TASK_STATUS_LABELS, TaskStatus } from '@/types'
import TaskCard from './TaskCard'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'

interface KanbanBoardProps {
  columns: { id: TaskStatus; title: string; tasks: Task[] }[]
  studentNames?: Record<string, string>
  projectTitles?: Record<string, string>
  onTaskClick?: (task: Task) => void
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void
  selectedIds?: Set<string>
  selectMode?: boolean
  className?: string
}

export default function KanbanBoard({ columns, studentNames = {}, projectTitles = {}, onTaskClick, onStatusChange, selectedIds, selectMode, className }: KanbanBoardProps) {
  return (
    <div className={cn('flex gap-4 overflow-x-auto pb-4 hide-scrollbar', className)}>
      {columns.map((col) => (
        <div key={col.id} className="flex-shrink-0 w-[280px] flex flex-col">
          <div className="flex items-center justify-between px-3 py-2.5 rounded-xl mb-3 bg-slate-50">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-md text-[11px] font-bold bg-slate-200 text-slate-600">{col.tasks.length}</span>
              <h3 className="text-sm font-semibold text-slate-900">{col.title}</h3>
            </div>
          </div>
          <div className="flex-1 space-y-3 kanban-column p-2 min-h-[200px]">
            {col.tasks.map((task) => (
              <div key={task.id} className="relative">
                {selectMode && (
                  <button onClick={(e) => { e.stopPropagation(); onTaskClick?.(task) }}
                    className={`absolute top-2 left-2 z-10 p-0.5 rounded border transition-colors ${selectedIds?.has(task.id) ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-white border-slate-300 text-transparent hover:text-slate-400'}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14"><path d="M11.5 3.5L6 9 3.5 6.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                )}
                <TaskCard
                  task={task}
                  assigneeName={studentNames[task.assigneeId]}
                  projectTitle={task.projectId ? projectTitles[task.projectId] : undefined}
                  onClick={() => onTaskClick?.(task)}
                  onStatusChange={onStatusChange}
                />
              </div>
            ))}
            {col.tasks.length === 0 && <div className="text-center py-8 text-xs text-slate-400">暂无任务</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

export function groupTasksByStatus(tasks: Task[]): { id: TaskStatus; title: string; tasks: Task[] }[] {
  const statuses: TaskStatus[] = ['todo', 'in_progress', 'done']
  return statuses.map(status => ({ id: status, title: TASK_STATUS_LABELS[status], tasks: tasks.filter(t => t.status === status) }))
}
