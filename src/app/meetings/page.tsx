'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Plus, Trash2, Loader2 } from 'lucide-react'
import { deleteMeeting } from '@/lib/data-service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SectionHeader from '@/components/shared/SectionHeader'
import MeetingCard from '@/components/shared/MeetingCard'
import { useStore } from '@/lib/store'
import { mockPresentations } from '@/lib/mock-data'
import { format } from 'date-fns'

export default function MeetingsPage() {
  const { state, addMeeting, reload } = useStore()
  const { meetings } = state
  const upcoming = meetings.filter(m => m.status === 'upcoming')
  const past = meetings.filter(m => m.status === 'completed')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Create meeting
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState({ date: '', time: '14:00-17:00', location: '实验室 401', host: '赵志伟', topic: '' })
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    const { success, error } = await deleteMeeting(id)
    if (error) toast.error(`删除失败: ${error}`)
    else { toast.success('已删除'); await reload() }
    setDeletingId(null)
  }

  const handleCreate = async () => {
    if (!form.date) return
    await addMeeting({ date: form.date, time: form.time, location: form.location, host: form.host, topic: form.topic, status: 'upcoming' })
    toast.success('组会已安排')
    setForm({ date: '', time: '14:00-17:00', location: '实验室 401', host: '赵志伟', topic: '' })
    setFormOpen(false)
  }

  const list = tab === 'upcoming' ? upcoming : past

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <SectionHeader title="组会管理" description={`共 ${meetings.length} 次组会，${upcoming.length} 场即将进行`}
        action={<Button size="sm" className="gap-1.5" onClick={() => setFormOpen(true)}><Plus className="w-4 h-4" />安排组会</Button>} />

      {/* Tab switcher */}
      <div className="flex gap-2">
        {(['upcoming', 'past'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === t ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-100'}`}>
            {t === 'upcoming' ? '即将进行' : '历史记录'}
            <span className="ml-1.5 text-xs text-slate-400">({t === 'upcoming' ? upcoming.length : past.length})</span>
          </button>
        ))}
      </div>

      {/* Meeting list */}
      {list.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map(m => (
            <div key={m.id} className="relative group">
              <MeetingCard meeting={m} presentations={mockPresentations.filter(p => p.meetingId === m.id)} />
              <button onClick={(e) => { e.stopPropagation(); handleDelete(m.id) }} disabled={deletingId === m.id}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-white border border-slate-200 shadow-sm hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity">
                {deletingId === m.id ? <Loader2 className="w-3.5 h-3.5 animate-spin text-red-400" /> : <Trash2 className="w-3.5 h-3.5 text-red-400" />}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400">
          <p>{tab === 'upcoming' ? '暂无即将进行的组会' : '暂无历史组会记录'}</p>
        </div>
      )}

      {/* Create form modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setFormOpen(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-slate-900 mb-4">安排组会</h2>
            <div className="space-y-3">
              <div className="space-y-1.5"><Label>日期 *</Label><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>主题</Label><Input value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} placeholder="本次组会的主题" /></div>
              <div className="space-y-1.5"><Label>时间</Label><Input value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>地点</Label><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setFormOpen(false)}>取消</Button>
              <Button onClick={handleCreate} disabled={!form.date}>安排</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
