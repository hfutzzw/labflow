'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Plus, Trash2, Pencil, Loader2, User, Mail, Phone, GraduationCap, Building, Calendar, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import SectionHeader from '@/components/shared/SectionHeader'
import { supabase } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

interface Interview {
  id: string; name: string; school: string; major: string; gpa: string
  email: string; phone: string; target_degree: string; source: string
  status: string; interview_date: string | null; notes: string; evaluation: string
  created_at: string
}

const STATUSES = ['待联系', '已联系', '已面试', '已录取', '已拒绝']
const STATUS_COLORS: Record<string, string> = {
  '待联系': 'bg-slate-100 text-slate-600', '已联系': 'bg-blue-50 text-blue-600',
  '已面试': 'bg-amber-50 text-amber-600', '已录取': 'bg-emerald-50 text-emerald-600',
  '已拒绝': 'bg-red-50 text-red-500',
}
const SOURCES = ['夏令营', '考研', '保研', '内推', '其他']

const emptyForm = (): Partial<Interview> => ({
  name: '', school: '', major: '', gpa: '', email: '', phone: '',
  target_degree: '硕士', source: '夏令营', status: '待联系',
  interview_date: null, notes: '', evaluation: '',
})

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<Partial<Interview>>(emptyForm())
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Interview | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('interviews').select('*').order('created_at', { ascending: false })
    setInterviews((data || []) as Interview[])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openAdd = () => { setEditingId(null); setForm(emptyForm()); setDialogOpen(true) }
  const openEdit = (i: Interview) => { setEditingId(i.id); setForm(i); setDialogOpen(true) }

  const save = async () => {
    if (!form.name?.trim()) return
    setSaving(true)
    if (editingId) {
      const { error } = await supabase.from('interviews').update({ ...form, updated_at: new Date().toISOString() }).eq('id', editingId)
      if (error) toast.error(error.message)
      else toast.success('已更新')
    } else {
      const { error } = await supabase.from('interviews').insert(form)
      if (error) toast.error(error.message)
      else toast.success('已添加')
    }
    setSaving(false); setDialogOpen(false); load()
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    const { error } = await supabase.from('interviews').delete().eq('id', deleteTarget.id)
    if (error) toast.error(error.message)
    else toast.success('已删除')
    setDeleteTarget(null); load()
  }

  const changeStatus = async (id: string, status: string) => {
    await supabase.from('interviews').update({ status, updated_at: new Date().toISOString() }).eq('id', id)
    setInterviews(prev => prev.map(i => i.id === id ? { ...i, status } : i))
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <SectionHeader title="招生面试" description={`共 ${interviews.length} 名候选人`}
        action={<Button size="sm" className="gap-1.5" onClick={openAdd}><Plus className="w-4 h-4" />添加候选人</Button>} />

      {/* Kanban columns */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {STATUSES.map(status => {
          const items = interviews.filter(i => i.status === status)
          return (
            <div key={status} className="space-y-2">
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-slate-100">
                <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded', STATUS_COLORS[status])}>{status}</span>
                <span className="text-xs text-slate-400">{items.length}</span>
              </div>
              <div className="space-y-2 min-h-[100px]">
                {items.map(item => (
                  <div key={item.id}
                    onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                    className="p-3.5 bg-white rounded-xl border border-slate-200 card-hover cursor-pointer text-left"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{item.name}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{item.school} · {item.major}</p>
                      </div>
                      <div className="flex gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        {STATUSES.filter(s => s !== status).slice(0, 1).map(s => (
                          <button key={s} onClick={e => { e.stopPropagation(); changeStatus(item.id, s === '已录取' || s === '已拒绝' ? status : s) }}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-medium">
                            {s === '已联系' ? '联系' : s === '已面试' ? '面试' : '→'}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                      <span className={cn('px-1.5 py-0.5 rounded', item.target_degree === '博士' ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-500')}>{item.target_degree}</span>
                      <span>{item.source}</span>
                      {item.gpa && <span>GPA {item.gpa}</span>}
                    </div>
                    {/* Expanded detail */}
                    {expanded === item.id && (
                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                        {item.email && <p className="text-slate-500 flex items-center gap-1.5"><Mail className="w-3 h-3" />{item.email}</p>}
                        {item.phone && <p className="text-slate-500 flex items-center gap-1.5"><Phone className="w-3 h-3" />{item.phone}</p>}
                        {item.interview_date && <p className="text-slate-500 flex items-center gap-1.5"><Calendar className="w-3 h-3" />面试：{format(new Date(item.interview_date), 'yyyy/MM/dd')}</p>}
                        {item.notes && <p className="text-slate-600 bg-slate-50 p-2 rounded-lg mt-1">{item.notes}</p>}
                        {item.evaluation && <p className="text-emerald-700 bg-emerald-50 p-2 rounded-lg">评价：{item.evaluation}</p>}
                        <div className="flex gap-2 mt-2">
                          <button onClick={e => { e.stopPropagation(); openEdit(item) }}
                            className="text-[11px] text-indigo-600 hover:underline">编辑</button>
                          <button onClick={e => { e.stopPropagation(); setDeleteTarget(item) }}
                            className="text-[11px] text-red-500 hover:underline">删除</button>
                          {STATUSES.filter(s => s !== status).slice(0, 3).map(s => (
                            <button key={s} onClick={e => { e.stopPropagation(); changeStatus(item.id, s) }}
                              className="text-[11px] text-blue-600 hover:underline">{s}</button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Add/Edit Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setDialogOpen(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-slate-900 mb-4">{editingId ? '编辑候选人' : '添加候选人'}</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2"><Label>姓名 *</Label><Input value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label>学校</Label><Input value={form.school || ''} onChange={e => setForm({ ...form, school: e.target.value })} /></div>
              <div><Label>专业</Label><Input value={form.major || ''} onChange={e => setForm({ ...form, major: e.target.value })} /></div>
              <div><Label>GPA</Label><Input value={form.gpa || ''} onChange={e => setForm({ ...form, gpa: e.target.value })} placeholder="3.8/4.0" /></div>
              <div><Label>学位</Label>
                <Select value={form.target_degree || '硕士'} onValueChange={v => { if (v) setForm({ ...form, target_degree: v }) }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="硕士">硕士</SelectItem><SelectItem value="博士">博士</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="col-span-2"><Label>邮箱</Label><Input value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
              <div><Label>手机</Label><Input value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
              <div><Label>来源</Label>
                <Select value={form.source || '夏令营'} onValueChange={v => { if (v) setForm({ ...form, source: v }) }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{SOURCES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>状态</Label>
                <Select value={form.status || '待联系'} onValueChange={v => { if (v) setForm({ ...form, status: v }) }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>面试日期</Label><Input type="date" value={form.interview_date || ''} onChange={e => setForm({ ...form, interview_date: e.target.value })} /></div>
              <div className="col-span-2"><Label>备注</Label><Textarea rows={2} value={form.notes || ''} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="研究方向、导师意向等" className="text-xs" /></div>
              <div className="col-span-2"><Label>面试评价</Label><Textarea rows={2} value={form.evaluation || ''} onChange={e => setForm({ ...form, evaluation: e.target.value })} placeholder="面试后的评价记录" className="text-xs" /></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
              <Button onClick={save} disabled={saving || !form.name?.trim()}>{saving ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}保存</Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setDeleteTarget(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-2">确认删除</h2>
            <p className="text-sm text-slate-500 mb-4">删除 {deleteTarget.name}？不可恢复。</p>
            <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setDeleteTarget(null)}>取消</Button><Button variant="destructive" onClick={handleDelete}>删除</Button></div>
          </div>
        </div>
      )}
    </div>
  )
}
