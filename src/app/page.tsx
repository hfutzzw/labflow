'use client'

import { useState, useMemo } from 'react'
import { format } from 'date-fns'
import { Users, FlaskConical, Calendar, Clock, Plus, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import StatCard from '@/components/shared/StatCard'
import SectionHeader from '@/components/shared/SectionHeader'
import StudentCard from '@/components/shared/StudentCard'
import ConferenceCard from '@/components/shared/ConferenceCard'
import MeetingCard from '@/components/shared/MeetingCard'
import ProgressBar from '@/components/shared/ProgressBar'
import { StudentsByGradeChart, ProjectStagePieChart } from '@/components/shared/DashboardChart'
import { useStore } from '@/lib/store'
import { mockPresentations } from '@/lib/mock-data'
import type { TaskType, TaskPriority } from '@/types'
import { TASK_TYPE_LABELS } from '@/types'
import { daysUntil, safeDaysUntil } from '@/lib/utils'

export default function DashboardPage() {
  const { state, addTask, addMeeting } = useStore()
  const { students, tasks, meetings, projects, conferences } = state

  const SUPERVISOR_ID = 'supervisor'
  const today = new Date().toISOString().slice(0, 10)
  const GRADE_SORT: Record<string, number> = { '研三': 0, '研二': 1, '研一': 2, '大四': 3, '大三': 4, '大二': 5, '大一': 6 }
  const activeStudents = students.filter(s => s.status === 'active' && s.id !== SUPERVISOR_ID).sort((a, b) => (GRADE_SORT[a.grade] ?? 9) - (GRADE_SORT[b.grade] ?? 9))
  const supervisorTasks = tasks.filter(t => t.assigneeId === SUPERVISOR_ID)
  const upcomingMeetings = meetings.filter(m => m.status === 'upcoming')
  // Stats — computed from store data
  const stats = useMemo(() => {
    const future = conferences.filter(c => c?.fullPaperDeadline && c.fullPaperDeadline >= today).sort((a, b) => a.fullPaperDeadline.localeCompare(b.fullPaperDeadline))
    return {
      totalStudents: activeStudents.length,
      weeklyMeetings: upcomingMeetings.length,
      activeProjects: projects.filter(p => !['accepted'].includes(p.stage)).length,
      nextDdlDays: future.length > 0 ? Math.max(0, safeDaysUntil(future[0].fullPaperDeadline)) : 0,
    }
  }, [activeStudents, upcomingMeetings, projects, conferences, today])

  // Task dialog
  const [taskOpen, setTaskOpen] = useState(false)
  const [taskForm, setTaskForm] = useState({ title: '', assigneeId: '', type: 'run_experiment' as TaskType, priority: 'medium' as TaskPriority, dueDate: '' })

  // Supervisor quick task
  const [superTaskOpen, setSuperTaskOpen] = useState(false)
  const [superTaskForm, setSuperTaskForm] = useState({ title: '', type: 'project_material' as TaskType, priority: 'medium' as TaskPriority, dueDate: '' })

  // Meeting dialog
  const [meetingOpen, setMeetingOpen] = useState(false)
  const [meetingForm, setMeetingForm] = useState({ date: '', time: '14:00-17:00', location: '实验室 401', host: '赵志伟', topic: '' })

  const handleCreateTask = async () => {
    if (!taskForm.title || !taskForm.assigneeId) return
    const now = new Date().toISOString().slice(0, 10)
    await addTask({
      title: taskForm.title, assigneeId: taskForm.assigneeId,
      type: taskForm.type, priority: taskForm.priority,
      status: 'todo', dueDate: taskForm.dueDate || now,
      progress: 0, isDelayed: false, createdAt: now,
    })
    setTaskForm({ title: '', assigneeId: '', type: 'run_experiment', priority: 'medium', dueDate: '' })
    setTaskOpen(false)
  }

  const handleCreateSuperTask = async () => {
    if (!superTaskForm.title) return
    const now = new Date().toISOString().slice(0, 10)
    await addTask({
      title: superTaskForm.title, assigneeId: SUPERVISOR_ID,
      type: superTaskForm.type, priority: superTaskForm.priority,
      status: 'todo', dueDate: superTaskForm.dueDate || now,
      progress: 0, isDelayed: false,
    })
    setSuperTaskForm({ title: '', type: 'project_material', priority: 'medium', dueDate: '' })
    setSuperTaskOpen(false)
  }

  const handleCreateMeeting = async () => {
    if (!meetingForm.date) return
    const now = new Date().toISOString().slice(0, 10)
    await addMeeting({
      date: meetingForm.date, time: meetingForm.time, location: meetingForm.location,
      host: meetingForm.host, topic: meetingForm.topic, status: 'upcoming', participants: [],
      createdAt: now,
    })
    setMeetingForm({ date: '', time: '14:00-17:00', location: '实验室 401', host: '赵志伟', topic: '' })
    setMeetingOpen(false)
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      {/* Welcome */}
      <div className="relative overflow-hidden rounded-2xl gradient-welcome p-8 text-white">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white/80" />
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">LabFlow 课题组科研管理平台</h1>
            </div>
            <p className="text-sm text-white/70 max-w-lg">统一管理学生、科研任务、论文进度与顶会 DDL — {format(new Date(), 'yyyy年M月d日 EEEE')}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20" onClick={() => setTaskOpen(true)}>
              <Plus className="w-4 h-4" />新建任务
            </Button>
            <Button variant="secondary" size="sm" className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMeetingOpen(true) }}>
              <Calendar className="w-4 h-4" />安排组会
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="在读学生" value={stats.totalStudents} icon={Users} color="blue" trend="up" trendValue="本学期 +2" />
        <StatCard label="本周组会" value={stats.weeklyMeetings} icon={Calendar} color="violet" />
        <StatCard label="活跃任务" value={tasks.filter(t => t.status === 'in_progress').length} icon={FlaskConical} color="sky" />
        <StatCard label="最近 DDL" value={`${stats.nextDdlDays} 天`} icon={Clock} color="green" />
      </div>

      {/* ===== 导师工作台 ===== */}
      <div className="p-6 bg-white rounded-2xl border border-indigo-100 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white text-2xl font-bold shadow-lg shadow-indigo-500/20 shrink-0">赵</div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">赵志伟 · 导师工作台</h2>
            <p className="text-sm text-slate-500">课题组负责人</p>
          </div>
          <div className="ml-auto">
            <Button size="sm" variant="outline" onClick={() => setSuperTaskOpen(true)}>+ 添加任务</Button>
          </div>
        </div>
        {supervisorTasks.length > 0 ? (
          <div className="space-y-2">
            {supervisorTasks.map(task => (
              <div key={task.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                <span className="text-lg shrink-0">{task.type === 'project_material' ? '📦' : task.type === 'write_paper' ? '✍️' : task.type === 'read_paper' ? '📄' : '📌'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{task.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">截止 {task.dueDate} · {TASK_TYPE_LABELS[task.type]}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${task.status === 'in_progress' ? 'bg-sky-50 text-sky-700' : task.status === 'todo' ? 'bg-slate-100 text-slate-500' : 'bg-emerald-50 text-emerald-700'}`}>
                    {task.status === 'in_progress' ? '进行中' : task.status === 'todo' ? '未开始' : '已完成'}
                  </span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${task.priority === 'urgent' ? 'bg-red-50 text-red-600' : task.priority === 'high' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                    {task.priority === 'urgent' ? '紧急' : task.priority === 'high' ? '高' : '中'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 text-center py-6">暂无任务，点击右上角「添加任务」开始</p>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {upcomingMeetings.length > 0 && (
            <div>
              <SectionHeader title="本周组会" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingMeetings.slice(0, 2).map(meeting => (
                  <MeetingCard key={meeting.id} meeting={meeting} presentations={mockPresentations.filter(p => p.meetingId === meeting.id)} />
                ))}
              </div>
            </div>
          )}
          <div>
            <SectionHeader title="学生进度总览" action={<a href="/students" className="text-xs font-medium text-slate-500 hover:text-slate-700">查看全部 <ChevronRight className="w-3 h-3 inline" /></a>} />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {activeStudents.map(s => <StudentCard key={s.id} student={s} />)}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <SectionHeader title="最近 DDL" action={<a href="/conferences" className="text-xs font-medium text-slate-500 hover:text-slate-700">全部 <ChevronRight className="w-3 h-3 inline" /></a>} />
            <div className="space-y-3">
              {conferences.filter(c => c.fullPaperDeadline >= '2026-06-12').slice(0, 5).map(c => <ConferenceCard key={c.id} conference={c} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Create Task Dialog */}
      <Dialog open={taskOpen} onOpenChange={setTaskOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>新建任务</DialogTitle></DialogHeader>
          <div className="space-y-3 mt-2">
            <div className="space-y-1.5"><Label>任务标题 *</Label><Input value={taskForm.title} onChange={e => setTaskForm({ ...taskForm, title: e.target.value })} placeholder="任务描述" /></div>
            <div className="space-y-1.5"><Label>负责人 *</Label>
              <Select value={taskForm.assigneeId} onValueChange={(v) => { if (v) setTaskForm({ ...taskForm, assigneeId: v }) }}>
                <SelectTrigger><SelectValue placeholder="选择学生" /></SelectTrigger>
                <SelectContent>
                  {activeStudents.map(s => <SelectItem key={s.id} value={s.id}>{s.name} ({s.grade})</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>任务类型</Label>
                <Select value={taskForm.type} onValueChange={(v) => { if (v) setTaskForm({ ...taskForm, type: v as TaskType }) }}>
                  <SelectTrigger><SelectValue>{TASK_TYPE_LABELS[taskForm.type]}</SelectValue></SelectTrigger>
                  <SelectContent>{Object.entries(TASK_TYPE_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>优先级</Label>
                <Select value={taskForm.priority} onValueChange={(v) => { if (v) setTaskForm({ ...taskForm, priority: v as TaskPriority }) }}>
                  <SelectTrigger><SelectValue>{{ low: '低', medium: '中', high: '高', urgent: '紧急' }[taskForm.priority]}</SelectValue></SelectTrigger>
                  <SelectContent><SelectItem value="low">低</SelectItem><SelectItem value="medium">中</SelectItem><SelectItem value="high">高</SelectItem><SelectItem value="urgent">紧急</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5"><Label>截止日期</Label><Input type="date" value={taskForm.dueDate} onChange={e => setTaskForm({ ...taskForm, dueDate: e.target.value })} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setTaskOpen(false)}>取消</Button><Button onClick={handleCreateTask} disabled={!taskForm.title || !taskForm.assigneeId}>创建</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Supervisor Quick Task Dialog */}
      <Dialog open={superTaskOpen} onOpenChange={setSuperTaskOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>添加导师任务</DialogTitle></DialogHeader>
          <div className="space-y-3 mt-2">
            <div className="space-y-1.5"><Label>任务标题 *</Label><Input value={superTaskForm.title} onChange={e => setSuperTaskForm({ ...superTaskForm, title: e.target.value })} placeholder="任务描述" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>任务类型</Label>
                <Select value={superTaskForm.type} onValueChange={(v) => { if (v) setSuperTaskForm({ ...superTaskForm, type: v as TaskType }) }}>
                  <SelectTrigger><SelectValue>{TASK_TYPE_LABELS[superTaskForm.type]}</SelectValue></SelectTrigger>
                  <SelectContent>{Object.entries(TASK_TYPE_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>优先级</Label>
                <Select value={superTaskForm.priority} onValueChange={(v) => { if (v) setSuperTaskForm({ ...superTaskForm, priority: v as TaskPriority }) }}>
                  <SelectTrigger><SelectValue>{{ low: '低', medium: '中', high: '高', urgent: '紧急' }[superTaskForm.priority]}</SelectValue></SelectTrigger>
                  <SelectContent><SelectItem value="low">低</SelectItem><SelectItem value="medium">中</SelectItem><SelectItem value="high">高</SelectItem><SelectItem value="urgent">紧急</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5"><Label>截止日期</Label><Input type="date" value={superTaskForm.dueDate} onChange={e => setSuperTaskForm({ ...superTaskForm, dueDate: e.target.value })} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setSuperTaskOpen(false)}>取消</Button><Button onClick={handleCreateSuperTask} disabled={!superTaskForm.title}>创建</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Meeting Dialog */}
      {meetingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setMeetingOpen(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-slate-900 mb-4">安排组会</h2>
            <div className="space-y-3">
              <div className="space-y-1.5"><Label>日期 *</Label><Input type="date" value={meetingForm.date} onChange={e => setMeetingForm({ ...meetingForm, date: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>主题</Label><Input value={meetingForm.topic} onChange={e => setMeetingForm({ ...meetingForm, topic: e.target.value })} placeholder="本次组会的主题" /></div>
              <div className="space-y-1.5"><Label>时间</Label><Input value={meetingForm.time} onChange={e => setMeetingForm({ ...meetingForm, time: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>地点</Label><Input value={meetingForm.location} onChange={e => setMeetingForm({ ...meetingForm, location: e.target.value })} /></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setMeetingOpen(false)}>取消</Button>
              <Button onClick={handleCreateMeeting} disabled={!meetingForm.date}>安排</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
