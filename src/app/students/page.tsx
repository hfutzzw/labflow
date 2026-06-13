'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X, Plus, Pencil, Trash2, Loader2, CheckSquare, Square } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import SectionHeader from '@/components/shared/SectionHeader'
import StudentCard from '@/components/shared/StudentCard'
import EmptyState from '@/components/shared/EmptyState'
import { useStore } from '@/lib/store'
import type { Student, StudentGrade, StudentStatus, Degree } from '@/types'
import { cn } from '@/lib/utils'

const ALL_GRADES: StudentGrade[] = ['研三', '研二', '研一', '大四', '大三', '大二', '大一']
const GRADE_ORDER: Record<string, number> = { '研三': 0, '研二': 1, '研一': 2, '大四': 3, '大三': 4, '大二': 5, '大一': 6 }
const ALL_STATUSES: StudentStatus[] = ['active', 'leave', 'graduated', 'suspended']
const statusLabels: Record<StudentStatus, string> = { active: '在读', leave: '休学', graduated: '已毕业', suspended: '暂停' }
const degreeLabels: Record<Degree, string> = { bachelor: '本科', master: '硕士', phd: '博士', faculty: '导师' }

const emptyForm = (): Partial<Student> => ({
  name: '', grade: '研一', degree: 'master', enrollmentYear: 2026, expectedGraduationYear: 2029,
  researchDirection: '', supervisor: '赵志伟', status: 'active',
  experimentProgress: 0, writingProgress: 0,
})

export default function StudentsPage() {
  const { state, addStudent, updateStudent, deleteStudent } = useStore()
  const { students } = state
  const [search, setSearch] = useState('')
  const [gradeFilter, setGradeFilter] = useState<StudentGrade | null>(null)
  const [directionFilter, setDirectionFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<StudentStatus | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<Partial<Student>>(emptyForm())
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [batchDeleting, setBatchDeleting] = useState(false)

  const ALL_DIRECTIONS = [...new Set(students.map(s => s.researchDirection).filter(Boolean))]

  const filtered = useMemo(() => {
    let result = students.filter(s => s.id !== 'supervisor')
    if (search) { const q = search.toLowerCase(); result = result.filter(s => s.name.includes(q) || s.researchDirection.toLowerCase().includes(q) || (s.currentProject && s.currentProject.toLowerCase().includes(q))) }
    if (gradeFilter) result = result.filter(s => s.grade === gradeFilter)
    if (directionFilter) result = result.filter(s => s.researchDirection === directionFilter)
    if (statusFilter) result = result.filter(s => s.status === statusFilter)
    result.sort((a, b) => (GRADE_ORDER[a.grade] ?? 9) - (GRADE_ORDER[b.grade] ?? 9))
    return result
  }, [students, search, gradeFilter, directionFilter, statusFilter])

  const clearFilters = () => { setSearch(''); setGradeFilter(null); setDirectionFilter(null); setStatusFilter(null) }
  const hasFilters = gradeFilter || directionFilter || statusFilter || search
  const openAdd = () => { setEditingId(null); setForm(emptyForm()); setFormOpen(true) }
  const openEdit = (s: Student) => { setEditingId(s.id); setForm({ ...s }); setFormOpen(true) }

  const saveStudent = async () => {
    if (!form.name?.trim()) return
    setSaving(true)
    if (editingId) { await updateStudent(editingId, form) }
    else { await addStudent(form) }
    setSaving(false); setFormOpen(false)
  }

  const toggleSelect = (id: string) => {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
  }
  const selectAll = () => {
    if (selected.size === filtered.length) setSelected(new Set())
    else setSelected(new Set(filtered.map(s => s.id)))
  }
  const batchDelete = async () => {
    setBatchDeleting(true)
    for (const id of selected) await deleteStudent(id)
    setSelected(new Set())
    setBatchDeleting(false)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    await deleteStudent(deleteTarget.id)
    setDeleting(false); setDeleteTarget(null)
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <SectionHeader title="学生管理" description={`共 ${students.filter(s => s.id !== 'supervisor').length} 名，筛选 ${filtered.length} 名`}
        action={
          <div className="flex gap-2">
            {selected.size > 0 && (
              <Button size="sm" variant="destructive" onClick={batchDelete} disabled={batchDeleting} className="gap-1.5">
                {batchDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                删除 {selected.size} 项
              </Button>
            )}
            {selected.size > 0 && <Button size="sm" variant="ghost" onClick={() => setSelected(new Set())}>取消选择</Button>}
            <Button size="sm" variant="outline" onClick={selectAll} className="gap-1.5">
              {selected.size === filtered.length && filtered.length > 0 ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
              {selected.size === filtered.length ? '取消全选' : '全选'}
            </Button>
            <Button size="sm" className="gap-1.5" onClick={openAdd}><Plus className="w-4 h-4" />添加学生</Button>
          </div>
        } />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><Input placeholder="搜索姓名、研究方向..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-white border-slate-200" /></div>
        <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className={cn('gap-2', showFilters && 'border-indigo-500 text-indigo-600')}><SlidersHorizontal className="w-4 h-4" />筛选{hasFilters && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}</Button>
        {hasFilters && <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-slate-500"><X className="w-3 h-3" />清除</Button>}
      </div>

      {showFilters && (
        <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ label: '年级', items: ALL_GRADES.map(g => ({ key: g, label: g, filter: gradeFilter, set: setGradeFilter })) },
              { label: '状态', items: ALL_STATUSES.map(st => ({ key: st, label: statusLabels[st], filter: statusFilter, set: setStatusFilter })) },
            ].map(group => (
              <div key={group.label}><p className="text-xs font-medium text-slate-500 mb-2">{group.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map(item => (
                    <button key={item.key} onClick={() => item.set((item.filter as any) === item.key ? null : item.key as any)}
                      className={cn('px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border', (item.filter as any) === item.key ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-slate-100 text-slate-500 border-transparent hover:border-slate-200')}>{item.label}</button>
                  ))}
                </div>
              </div>
            ))}
            <div><p className="text-xs font-medium text-slate-500 mb-2">研究方向</p><div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">{ALL_DIRECTIONS.map(d => <button key={d} onClick={() => setDirectionFilter(directionFilter === d ? null : d)} className={cn('px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border', directionFilter === d ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-slate-100 text-slate-500 border-transparent hover:border-slate-200')}>{d}</button>)}</div></div>
          </div>
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(s => (
            <div key={s.id} className="relative group">
              <button onClick={(e) => { e.preventDefault(); toggleSelect(s.id) }} className={`absolute top-3 left-3 z-10 p-1 rounded-lg border transition-colors ${selected.has(s.id) ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-white border-slate-200 text-transparent group-hover:text-slate-400'}`}>
                {selected.has(s.id) ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
              </button>
              <StudentCard student={s} />
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={(e) => { e.preventDefault(); openEdit(s) }} className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-sm hover:bg-slate-50"><Pencil className="w-3.5 h-3.5 text-slate-500" /></button>
                <button onClick={(e) => { e.preventDefault(); setDeleteTarget(s) }} className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-sm hover:bg-red-50"><Trash2 className="w-3.5 h-3.5 text-red-500" /></button>
              </div>
            </div>
          ))}
        </div>
      ) : <EmptyState title="没有找到匹配的学生" action={<Button variant="outline" size="sm" onClick={clearFilters}>清除筛选</Button>} />}

      {/* Add/Edit Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editingId ? '编辑学生' : '添加学生'}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="col-span-2"><Label>姓名 *</Label><Input value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>年级</Label><Select value={form.grade} onValueChange={v => { if (v) setForm({ ...form, grade: v as StudentGrade }) }}><SelectTrigger><SelectValue>{form.grade}</SelectValue></SelectTrigger><SelectContent>{ALL_GRADES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent></Select></div>
            <div><Label>学位</Label><Select value={form.degree || 'master'} onValueChange={v => { if (v) setForm({ ...form, degree: v as Degree }) }}><SelectTrigger><SelectValue>{form.degree === 'bachelor' ? '本科' : '硕士'}</SelectValue></SelectTrigger><SelectContent><SelectItem value="bachelor">本科</SelectItem><SelectItem value="master">硕士</SelectItem></SelectContent></Select></div>
            <div><Label>入学年份</Label><Input type="number" value={form.enrollmentYear || ''} onChange={e => setForm({ ...form, enrollmentYear: Number(e.target.value) })} /></div>
            <div><Label>预计毕业</Label><Input type="number" value={form.expectedGraduationYear || ''} onChange={e => setForm({ ...form, expectedGraduationYear: Number(e.target.value) })} /></div>
            <div className="col-span-2"><Label>研究方向</Label><Input value={form.researchDirection || ''} onChange={e => setForm({ ...form, researchDirection: e.target.value })} /></div>
            <div><Label>导师</Label><Input value={form.supervisor || ''} onChange={e => setForm({ ...form, supervisor: e.target.value })} /></div>
            <div><Label>状态</Label><Select value={form.status} onValueChange={v => { if (v) setForm({ ...form, status: v as StudentStatus }) }}><SelectTrigger><SelectValue>{statusLabels[form.status!]}</SelectValue></SelectTrigger><SelectContent>{ALL_STATUSES.map(st => <SelectItem key={st} value={st}>{statusLabels[st]}</SelectItem>)}</SelectContent></Select></div>
            <div className="col-span-2"><Label>当前项目 (可选)</Label><Input value={form.currentProject || ''} onChange={e => setForm({ ...form, currentProject: e.target.value })} /></div>
          </div>
          <DialogFooter className="mt-4"><Button variant="outline" onClick={() => setFormOpen(false)}>取消</Button><Button onClick={saveStudent} disabled={!form.name?.trim() || saving}>{saving ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}{editingId ? '保存' : '添加'}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>确认删除</DialogTitle><DialogDescription>确定删除 <span className="font-semibold text-slate-900">{deleteTarget?.name}</span>？不可恢复。</DialogDescription></DialogHeader>
          <DialogFooter><Button variant="outline" onClick={() => setDeleteTarget(null)}>取消</Button><Button variant="destructive" onClick={confirmDelete} disabled={deleting}>{deleting ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}删除</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
