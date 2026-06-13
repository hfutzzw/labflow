'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { format } from 'date-fns'
import { ArrowLeft, GraduationCap, Target, AlertTriangle, Loader2, ChevronDown, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import SectionHeader from '@/components/shared/SectionHeader'
import StatusBadge from '@/components/shared/StatusBadge'
import ProgressBar from '@/components/shared/ProgressBar'
import { useStore } from '@/lib/store'
import { getTaskProgressLogs, createTaskProgressLog } from '@/lib/data-service'
import { Button as Btn } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { STUDENT_STATUS_LABELS, TASK_TYPE_LABELS, TASK_STATUS_LABELS, Task, TaskProgressLog, TaskType, TaskPriority } from '@/types'
import Link from 'next/link'

export default function StudentDetailPage() {
  const params = useParams()
  const { state, updateTask, addTask } = useStore()
  const { students, tasks } = state

  const student = students.find(s => s.id === params.id)
  if (!student) {
    return (
      <div className="max-w-[900px] mx-auto py-20 text-center">
        <p className="text-slate-400 text-lg mb-4">未找到该学生</p>
        <Link href="/students" className="text-indigo-600 hover:underline text-sm">← 返回学生列表</Link>
      </div>
    )
  }

  const studentTasks = tasks.filter(t => t.assigneeId === student.id)
  const degreeLabel = student.degree === 'master' ? '硕士' : '本科'

  // Track which task is expanded, and its logs
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null)
  const [logs, setLogs] = useState<Record<string, TaskProgressLog[]>>({})
  const [logForm, setLogForm] = useState({ progress: 0, currentStatus: '', difficulties: '', nextSteps: '' })
  const [saving, setSaving] = useState(false)

  // New task dialog
  const [newTaskOpen, setNewTaskOpen] = useState(false)
  const [newTaskForm, setNewTaskForm] = useState({ title: '', type: 'run_experiment' as TaskType, priority: 'medium' as TaskPriority, dueDate: '' })
  const [creating, setCreating] = useState(false)

  const toggleTask = useCallback(async (task: Task) => {
    if (expandedTaskId === task.id) {
      setExpandedTaskId(null)
      return
    }
    setExpandedTaskId(task.id)
    setLogForm({ progress: task.progress, currentStatus: '', difficulties: '', nextSteps: '' })
    if (!logs[task.id]) {
      const data = await getTaskProgressLogs(task.id)
      setLogs(prev => ({ ...prev, [task.id]: data }))
    }
  }, [expandedTaskId, logs])

  const handleCreateTask = async () => {
    if (!newTaskForm.title) return
    setCreating(true)
    const now = new Date().toISOString().slice(0, 10)
    await addTask({
      title: newTaskForm.title, assigneeId: student.id,
      type: newTaskForm.type, priority: newTaskForm.priority,
      status: 'todo', dueDate: newTaskForm.dueDate || now,
      progress: 0, isDelayed: false,
    })
    setCreating(false)
    setNewTaskOpen(false)
    setNewTaskForm({ title: '', type: 'run_experiment', priority: 'medium', dueDate: '' })
  }

  const handleAddLog = async (taskId: string) => {
    setSaving(true)
    const { success, error } = await createTaskProgressLog({
      taskId, progress: logForm.progress,
      currentStatus: logForm.currentStatus, difficulties: logForm.difficulties,
      nextSteps: logForm.nextSteps,
    })
    if (error) { toast.error(`添加失败: ${error}`) }
    else {
      toast.success('进度已记录')
      const updated = await getTaskProgressLogs(taskId)
      setLogs(prev => ({ ...prev, [taskId]: updated }))
      setLogForm(p => ({ ...p, currentStatus: '', difficulties: '', nextSteps: '' }))
      const newStatus = logForm.progress >= 100 ? 'done' : logForm.progress > 0 ? 'in_progress' : (tasks.find(t => t.id === taskId)?.status || 'todo')
      await updateTask({ id: taskId, progress: logForm.progress, status: newStatus })
    }
    setSaving(false)
  }

  return (
    <div className="max-w-[960px] mx-auto space-y-6">
      <Link href="/students" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="w-4 h-4" />返回学生列表
      </Link>

      {/* Profile — compact */}
      <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white text-lg font-bold shrink-0">
          {student.name.slice(0, 1)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg font-bold text-slate-900">{student.name}</h1>
            <span className="text-sm text-slate-500">{student.grade} · {degreeLabel}</span>
            <StatusBadge status={student.status} label={STUDENT_STATUS_LABELS[student.status]} />
          </div>
          <p className="text-sm text-slate-500 mt-0.5 truncate">
            {student.researchDirection} · {student.enrollmentYear}年入学 · 导师 {student.supervisor}
          </p>
        </div>
      </div>

      {/* ====== Tasks — main content ====== */}
      <div>
        <SectionHeader
          title={`${student.name} 的任务`}
          description={studentTasks.length > 0 ? `共 ${studentTasks.length} 个任务，展开可记录进度` : '尚未分配任务'}
          action={<Btn size="sm" variant="outline" onClick={() => setNewTaskOpen(true)}>+ 分配新任务</Btn>}
        />

        {studentTasks.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 mb-3">该学生还没有任务</p>
            <Link href="/tasks" className="text-sm text-indigo-600 hover:underline">去任务看板分配 →</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {studentTasks.map(task => {
              const isExpanded = expandedTaskId === task.id
              const taskLogs = logs[task.id] || []

              return (
                <div key={task.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  {/* Task header — clickable */}
                  <button
                    onClick={() => toggleTask(task)}
                    className="w-full text-left flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors"
                  >
                    <div className={isExpanded ? 'rotate-90 transition-transform' : 'transition-transform'}>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-sm font-semibold text-slate-900">{task.title}</span>
                        {task.isDelayed && <span className="text-[10px] font-semibold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">延期</span>}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>{TASK_TYPE_LABELS[task.type]}</span>
                        <span>截止 {task.dueDate}</span>
                        <span>{TASK_STATUS_LABELS[task.status]}</span>
                      </div>
                    </div>
                    <div className="w-28 shrink-0">
                      <ProgressBar value={task.progress} size="sm" />
                    </div>
                    <StatusBadge status={task.status} label={TASK_STATUS_LABELS[task.status]} />
                  </button>

                  {/* Expanded — progress log */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 p-5 bg-slate-50/50 space-y-4">
                      {/* Add record form */}
                      <div className="p-4 bg-white rounded-xl border border-indigo-200 shadow-sm space-y-3">
                        <p className="text-sm font-bold text-indigo-700 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />记录本次进度
                        </p>
                        <div className="space-y-1">
                          <Label className="text-xs font-semibold text-emerald-700 flex items-center gap-1">📝 当前进度</Label>
                          <Textarea rows={2} value={logForm.currentStatus} onChange={e => setLogForm({ ...logForm, currentStatus: e.target.value })} placeholder="这周完成了什么？数据跑了多少？论文写到哪了？" className="text-xs border-emerald-100 focus:border-emerald-300" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs font-semibold text-amber-700 flex items-center gap-1">⚠️ 遇到问题</Label>
                          <Textarea rows={2} value={logForm.difficulties} onChange={e => setLogForm({ ...logForm, difficulties: e.target.value })} placeholder="实验跑不通？代码有 bug？数据不够？思路卡住了？" className="text-xs border-amber-100 focus:border-amber-300" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs font-semibold text-blue-700 flex items-center gap-1">➡️ 下一步</Label>
                          <Textarea rows={2} value={logForm.nextSteps} onChange={e => setLogForm({ ...logForm, nextSteps: e.target.value })} placeholder="下周做什么？准备跑什么实验？交什么材料？" className="text-xs border-blue-100 focus:border-blue-300" />
                        </div>
                        <Button size="sm" className="w-full" onClick={() => handleAddLog(task.id)} disabled={saving || !logForm.currentStatus}>
                          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : null}保存记录
                        </Button>
                      </div>

                      {/* History */}
                      {taskLogs.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-slate-500 mb-2">进度记录 ({taskLogs.length})</p>
                          <div className="space-y-0">
                            {taskLogs.map((log, i) => (
                              <div key={log.id} className="relative pl-5 pb-4 border-l-2 border-slate-200 last:border-l-0 last:pb-0">
                                <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-2 ring-white" />
                                <p className="text-[11px] text-slate-500 font-medium mb-1.5">{format(new Date(log.createdAt), 'MM/dd HH:mm')}</p>
                                <p className="text-xs text-slate-900 leading-relaxed"><span className="font-semibold text-emerald-600">📝 当前进度：</span>{log.currentStatus}</p>
                                {log.difficulties && <p className="text-xs text-amber-700 leading-relaxed mt-1.5"><span className="font-semibold">⚠️ 遇到问题：</span>{log.difficulties}</p>}
                                {log.nextSteps && <p className="text-xs text-blue-700 leading-relaxed mt-1.5"><span className="font-semibold">➡️ 下一步：</span>{log.nextSteps}</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
      {/* ====== Create Task Dialog ====== */}
      <Dialog open={newTaskOpen} onOpenChange={setNewTaskOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>为 {student.name} 分配新任务</DialogTitle></DialogHeader>
          <div className="space-y-3 mt-2">
            <div className="space-y-1.5"><Label>任务标题 *</Label><Input value={newTaskForm.title} onChange={e => setNewTaskForm({ ...newTaskForm, title: e.target.value })} placeholder="任务描述" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>类型</Label>
                <Select value={newTaskForm.type} onValueChange={v => { if (v) setNewTaskForm({ ...newTaskForm, type: v as TaskType }) }}>
                  <SelectTrigger><SelectValue>{TASK_TYPE_LABELS[newTaskForm.type]}</SelectValue></SelectTrigger>
                  <SelectContent>{Object.entries(TASK_TYPE_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>优先级</Label>
                <Select value={newTaskForm.priority} onValueChange={v => { if (v) setNewTaskForm({ ...newTaskForm, priority: v as TaskPriority }) }}>
                  <SelectTrigger><SelectValue>{{ low: '低', medium: '中', high: '高', urgent: '紧急' }[newTaskForm.priority]}</SelectValue></SelectTrigger>
                  <SelectContent><SelectItem value="low">低</SelectItem><SelectItem value="medium">中</SelectItem><SelectItem value="high">高</SelectItem><SelectItem value="urgent">紧急</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5"><Label>截止日期</Label><Input type="date" value={newTaskForm.dueDate} onChange={e => setNewTaskForm({ ...newTaskForm, dueDate: e.target.value })} /></div>
          </div>
          <DialogFooter><Btn variant="outline" onClick={() => setNewTaskOpen(false)}>取消</Btn><Btn onClick={handleCreateTask} disabled={!newTaskForm.title || creating}>{creating ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : null}创建任务</Btn></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
