'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { toast } from 'sonner'
import { Plus, Trash2, Award, FileText, Trophy, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import SectionHeader from '@/components/shared/SectionHeader'
import { format } from 'date-fns'

interface Achievement {
  id: string
  studentId: string
  studentName: string
  type: 'paper' | 'patent' | 'award' | 'other'
  title: string
  detail: string
  date: string
}

const typeLabels: Record<string, string> = { paper: '论文', patent: '专利', award: '获奖', other: '其他' }
const typeIcons: Record<string, string> = { paper: '📄', patent: '💡', award: '🏆', other: '📌' }

export default function AchievementsPage() {
  const { state } = useStore()
  const { students } = state
  const activeStudents = students.filter(s => s.status === 'active' && s.grade !== '导师')

  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState({ studentId: '', type: 'paper' as Achievement['type'], title: '', detail: '', date: '' })
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleAdd = () => {
    if (!form.studentId || !form.title) return
    const student = students.find(s => s.id === form.studentId)
    const a: Achievement = {
      id: Date.now().toString(36),
      studentId: form.studentId,
      studentName: student?.name || '',
      type: form.type,
      title: form.title,
      detail: form.detail,
      date: form.date || new Date().toISOString().slice(0, 10),
    }
    setAchievements(prev => [a, ...prev])
    toast.success(`已添加成果: ${form.title}`)
    setForm({ studentId: '', type: 'paper', title: '', detail: '', date: '' })
    setDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setAchievements(prev => prev.filter(a => a.id !== id))
    setDeleteId(null)
    toast.success('已删除')
  }

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <SectionHeader title="学生成果管理" description={`共 ${achievements.length} 项成果`}
        action={<Button size="sm" className="gap-1.5" onClick={() => setDialogOpen(true)}><Plus className="w-4 h-4" />添加成果</Button>} />

      {achievements.length === 0 ? (
        <div className="text-center py-20">
          <Award className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-400 mb-2">暂无学生成果</p>
          <p className="text-sm text-slate-400 mb-4">记录学生的论文、专利、获奖等成果</p>
          <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)}>添加第一条成果</Button>
        </div>
      ) : (
        <div className="space-y-3">
          {achievements.map(a => (
            <div key={a.id} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-200 card-hover group">
              <span className="text-2xl shrink-0">{typeIcons[a.type]}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-indigo-50 text-indigo-600">{typeLabels[a.type]}</span>
                  <span className="text-xs text-slate-400">{format(new Date(a.date), 'yyyy/MM/dd')}</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900">{a.title}</h3>
                {a.detail && <p className="text-xs text-slate-500 mt-1">{a.detail}</p>}
                <p className="text-xs text-slate-500 mt-1.5">{a.studentName}</p>
              </div>
              <button onClick={() => setDeleteId(a.id)} className="p-1.5 rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>添加学生成果</DialogTitle></DialogHeader>
          <div className="space-y-3 mt-2">
            <div className="space-y-1.5"><Label>学生 *</Label>
              <Select value={form.studentId} onValueChange={v => { if (v) setForm({ ...form, studentId: v }) }}>
                <SelectTrigger><SelectValue placeholder="选择学生" /></SelectTrigger>
                <SelectContent>{activeStudents.map(s => <SelectItem key={s.id} value={s.id}>{s.name} ({s.grade})</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>类型</Label>
              <Select value={form.type} onValueChange={v => { if (v) setForm({ ...form, type: v as Achievement['type'] }) }}>
                <SelectTrigger><SelectValue>{{ paper: '📄 论文', patent: '💡 专利', award: '🏆 获奖', other: '📌 其他' }[form.type]}</SelectValue></SelectTrigger>
                <SelectContent>
                  <SelectItem value="paper">📄 论文</SelectItem>
                  <SelectItem value="patent">💡 专利</SelectItem>
                  <SelectItem value="award">🏆 获奖</SelectItem>
                  <SelectItem value="other">📌 其他</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>标题 *</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="论文/专利/获奖名称" /></div>
            <div className="space-y-1.5"><Label>详细信息 (可选)</Label><Input value={form.detail} onChange={e => setForm({ ...form, detail: e.target.value })} placeholder="期刊/会议/专利号等" /></div>
            <div className="space-y-1.5"><Label>日期</Label><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button><Button onClick={handleAdd} disabled={!form.studentId || !form.title}>添加</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>确认删除</DialogTitle></DialogHeader>
          <DialogFooter><Button variant="outline" onClick={() => setDeleteId(null)}>取消</Button><Button variant="destructive" onClick={() => deleteId && handleDelete(deleteId)}>删除</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
