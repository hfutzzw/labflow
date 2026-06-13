'use client'

import { useState, useMemo, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { toast } from 'sonner'
import KanbanBoard, { groupTasksByStatus } from '@/components/shared/KanbanBoard'
import SectionHeader from '@/components/shared/SectionHeader'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import ProgressBar from '@/components/shared/ProgressBar'
import { TASK_TYPE_LABELS, TASK_STATUS_LABELS, PRIORITY_LABELS, Task, TaskStatus, TaskProgressLog } from '@/types'
import { getTaskProgressLogs, createTaskProgressLog, deleteTask } from '@/lib/data-service'
import { User, Calendar, FileText, Flag, Loader2, Trash2, CheckSquare, Square } from 'lucide-react'
import { format } from 'date-fns'

export default function TasksPage() {
  const { state, updateTask, reload } = useStore()
  const { tasks, students, projects } = state
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [saving, setSaving] = useState(false)

  // Batch select
  const [selectMode, setSelectMode] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [batchDeleting, setBatchDeleting] = useState(false)

  // Progress log
  const [logs, setLogs] = useState<TaskProgressLog[]>([])
  const [logForm, setLogForm] = useState({ progress: 0, currentStatus: '', difficulties: '', nextSteps: '' })
  const [addingLog, setAddingLog] = useState(false)
  const [showLogForm, setShowLogForm] = useState(false)

  const studentNames: Record<string, string> = {}
  students.forEach(s => { studentNames[s.id] = s.name })
  const projectTitles: Record<string, string> = {}
  projects.forEach(p => { projectTitles[p.id] = p.title })

  const columns = useMemo(() => groupTasksByStatus(tasks), [tasks])
  const student = selectedTask ? students.find(s => s.id === selectedTask.assigneeId) : null
  const project = selectedTask?.projectId ? projects.find(p => p.id === selectedTask.projectId) : null

  useEffect(() => {
    if (selectedTask) {
      getTaskProgressLogs(selectedTask.id).then(setLogs)
      setShowLogForm(false)
    }
  }, [selectedTask?.id])

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    setSaving(true)
    await updateTask({ id: taskId, status: newStatus })
    if (selectedTask?.id === taskId) setSelectedTask({ ...selectedTask, status: newStatus })
    setSaving(false)
  }

  const handleAddLog = async () => {
    if (!selectedTask) return
    setAddingLog(true)
    const { success, error } = await createTaskProgressLog({
      taskId: selectedTask.id, progress: logForm.progress,
      currentStatus: logForm.currentStatus, difficulties: logForm.difficulties,
      nextSteps: logForm.nextSteps,
    })
    if (error) toast.error(`添加失败: ${error}`)
    else {
      toast.success('进度已记录')
      const updated = await getTaskProgressLogs(selectedTask.id)
      setLogs(updated)
      setLogForm({ progress: logForm.progress, currentStatus: '', difficulties: '', nextSteps: '' })
      setShowLogForm(false)
      const newStatus = logForm.progress >= 100 ? 'done' : logForm.progress > 0 ? 'in_progress' : selectedTask.status
      await updateTask({ id: selectedTask.id, progress: logForm.progress, status: newStatus })
    }
    setAddingLog(false)
  }

  const handleTaskClick = (task: Task) => {
    if (selectMode) {
      const next = new Set(selected)
      next.has(task.id) ? next.delete(task.id) : next.add(task.id)
      setSelected(next)
    } else {
      setSelectedTask(task)
    }
  }

  const toggleSelectAll = () => {
    if (selected.size === tasks.length) setSelected(new Set())
    else setSelected(new Set(tasks.map(t => t.id)))
  }

  const batchDelete = async () => {
    setBatchDeleting(true)
    for (const id of selected) {
      const { success } = await deleteTask(id)
      if (success) toast.success(`已删除任务`)
    }
    setSelected(new Set())
    setSelectMode(false)
    setBatchDeleting(false)
    await reload()
  }

  return (
    <div className="max-w-[1440px] mx-auto space-y-6">
      <SectionHeader
        title="任务看板"
        description={`共 ${tasks.length} 个任务，${tasks.filter(t => t.status === 'done').length} 已完成`}
        action={
          <div className="flex gap-2">
            {selectMode && selected.size > 0 && (
              <Button size="sm" variant="destructive" onClick={batchDelete} disabled={batchDeleting} className="gap-1.5">
                {batchDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                删除 {selected.size} 项
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={() => { setSelectMode(!selectMode); setSelected(new Set()) }} className="gap-1.5">
              {selectMode ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
              {selectMode ? '退出选择' : '批量选择'}
            </Button>
            {selectMode && <Button size="sm" variant="ghost" onClick={toggleSelectAll}>{selected.size === tasks.length ? '取消全选' : '全选'}</Button>}
          </div>
        }
      />

      <KanbanBoard
        columns={columns}
        studentNames={studentNames}
        projectTitles={projectTitles}
        onTaskClick={handleTaskClick}
        onStatusChange={selectMode ? undefined : (taskId, newStatus) => updateTask({ id: taskId, status: newStatus })}
        selectedIds={selected}
        selectMode={selectMode}
      />

      {/* Task detail dialog */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        {selectedTask && (
          <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
            <DialogHeader><DialogTitle className="text-base">{selectedTask.title}</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-slate-500"><User className="w-4 h-4" /><span>{student?.name || studentNames[selectedTask.assigneeId] || '未分配'} · {student?.grade}</span></div>
                <div className="flex items-center gap-2 text-slate-500"><Calendar className="w-4 h-4" /><span>截止 {selectedTask.dueDate}</span></div>
                {project && <div className="flex items-center gap-2 text-slate-500 col-span-2"><FileText className="w-4 h-4" /><span className="truncate">{project.title}</span></div>}
              </div>
              <div><p className="text-xs font-medium text-slate-500 mb-2">整体进度</p><ProgressBar value={selectedTask.progress} /></div>
              <div><p className="text-xs font-medium text-slate-500 mb-2">状态</p>
                <div className="flex flex-wrap gap-1.5">
                  {(['todo','in_progress','done'] as TaskStatus[]).map(key => (
                    <button key={key} onClick={() => handleStatusChange(selectedTask.id, key)} disabled={saving}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${selectedTask.status === key ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-slate-100 text-slate-500 border-transparent hover:border-slate-200'} disabled:opacity-50`}>{TASK_STATUS_LABELS[key]}</button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Flag className="w-3 h-3" />优先级：<span className="font-semibold">{PRIORITY_LABELS[selectedTask.priority]}</span></span>
                {selectedTask.isDelayed && <span className="text-red-500 font-semibold">已延期</span>}
              </div>
              <div className="border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-slate-900">进度跟进日志</p>
                  <Button size="sm" variant="outline" onClick={() => setShowLogForm(!showLogForm)}>{showLogForm ? '取消' : '+ 添加记录'}</Button>
                </div>
                {showLogForm && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 mb-3">
                    <div><Label className="text-xs font-medium mb-1 block">当前进度</Label><Textarea rows={2} value={logForm.currentStatus} onChange={e => setLogForm({ ...logForm, currentStatus: e.target.value })} placeholder="完成了什么..." className="mt-1 text-xs" /></div>
                    <div><Label className="text-xs font-medium mb-1 block">遇到问题</Label><Textarea rows={2} value={logForm.difficulties} onChange={e => setLogForm({ ...logForm, difficulties: e.target.value })} placeholder="遇到什么问题..." className="mt-1 text-xs" /></div>
                    <div><Label className="text-xs font-medium mb-1 block">下一步</Label><Textarea rows={2} value={logForm.nextSteps} onChange={e => setLogForm({ ...logForm, nextSteps: e.target.value })} placeholder="接下来要做什么..." className="mt-1 text-xs" /></div>
                    <Button size="sm" onClick={handleAddLog} disabled={addingLog || !logForm.currentStatus}>{addingLog ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : null}保存记录</Button>
                  </div>
                )}
                {logs.length > 0 ? (
                  <div className="space-y-2">
                    {logs.map(log => (
                      <div key={log.id} className="relative pl-6 pb-3 border-l-2 border-slate-200 last:border-l-0 last:pb-0">
                        <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-2 ring-white" />
                        <p className="text-[10px] text-slate-400 mb-1">{format(new Date(log.createdAt), 'MM/dd HH:mm')} · <span className="font-semibold text-indigo-600">{log.progress}%</span></p>
                        <p className="text-xs text-slate-900 mb-0.5">{log.currentStatus}</p>
                        {log.difficulties && <p className="text-xs text-amber-600">⚠ {log.difficulties}</p>}
                        {log.nextSteps && <p className="text-xs text-slate-500">→ {log.nextSteps}</p>}
                      </div>
                    ))}
                  </div>
                ) : <p className="text-xs text-slate-400 text-center py-4">暂无进度记录</p>}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
