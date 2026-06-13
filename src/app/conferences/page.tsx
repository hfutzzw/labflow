'use client'

import { useState, useMemo } from 'react'
import { Search, X, RefreshCw, Eye, EyeOff, Pencil } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import SectionHeader from '@/components/shared/SectionHeader'
import ConferenceCard from '@/components/shared/ConferenceCard'
import EmptyState from '@/components/shared/EmptyState'
import { useStore } from '@/lib/store'
import { fetchAndSyncConferences } from '@/lib/sync-conferences'
import type { ConferenceField, CCFLevel, Conference } from '@/types'
import { cn } from '@/lib/utils'

const ALL_FIELDS: ConferenceField[] = ['CV', 'NLP', 'ML', 'Data Mining', 'Robotics', 'Multi-modal']
const ALL_LEVELS: CCFLevel[] = ['A', 'B', 'C']

export default function ConferencesPage() {
  const { state } = useStore()
  const [conferences, setConferences] = useState<Conference[]>(state.conferences)
  const [search, setSearch] = useState('')
  const [fieldFilter, setFieldFilter] = useState<ConferenceField | null>(null)
  const [levelFilter, setLevelFilter] = useState<CCFLevel | null>(null)
  const [showPast, setShowPast] = useState(false)
  const [syncing, setSyncing] = useState(false)

  const filtered = useMemo(() => {
    let result = conferences
    if (search) { const q = search.toLowerCase(); result = result.filter(c => c.name.toLowerCase().includes(q)) }
    if (fieldFilter) result = result.filter(c => c.field === fieldFilter)
    if (levelFilter) result = result.filter(c => c.ccfLevel === levelFilter)
    if (!showPast) { const today = new Date().toISOString().slice(0, 10); result = result.filter(c => c.fullPaperDeadline >= today) }
    return [...result].sort((a, b) => a.fullPaperDeadline.localeCompare(b.fullPaperDeadline))
  }, [conferences, search, fieldFilter, levelFilter, showPast])

  const [editTarget, setEditTarget] = useState<Conference | null>(null)
  const [editForm, setEditForm] = useState({ abstractDeadline: '', fullPaperDeadline: '', year: 0, website: '', location: '' })

  const openEdit = (c: Conference) => {
    setEditTarget(c)
    setEditForm({ abstractDeadline: c.abstractDeadline, fullPaperDeadline: c.fullPaperDeadline, year: c.year, website: c.website || '', location: c.location || '' })
  }

  const saveEdit = () => {
    if (!editTarget) return
    setConferences(prev => prev.map(c => c.id === editTarget.id ? { ...c, ...editForm } : c))
    setEditTarget(null)
  }

  const clearFilters = () => { setSearch(''); setFieldFilter(null); setLevelFilter(null) }

  const handleSync = async () => {
    setSyncing(true)
    const result = await fetchAndSyncConferences()
    if (result.conferences.length > 0) setConferences(result.conferences as Conference[])
    setSyncing(false)
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <SectionHeader title="顶会 DDL" description={`共 ${conferences.length} 个会议`}
        action={<Button size="sm" onClick={handleSync} disabled={syncing} className="gap-1.5"><RefreshCw className={cn('w-4 h-4', syncing && 'animate-spin')} />{syncing ? '同步中...' : '在线同步 DDL'}</Button>} />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><Input placeholder="搜索会议..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-white border-slate-200" /></div>
        <Button variant="outline" size="sm" onClick={() => setShowPast(!showPast)} className={showPast ? 'border-indigo-500 text-indigo-600' : ''}>{showPast ? <Eye className="w-4 h-4 mr-1.5" /> : <EyeOff className="w-4 h-4 mr-1.5" />}{showPast ? '含已截止' : '仅未截止'}</Button>
      </div>

      <div className="flex flex-wrap gap-6">
        <div><p className="text-xs font-medium text-slate-500 mb-2">领域</p><div className="flex flex-wrap gap-1.5">{ALL_FIELDS.map(f => <button key={f} onClick={() => setFieldFilter(fieldFilter === f ? null : f)} className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border', fieldFilter === f ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300')}>{f}</button>)}</div></div>
        <div><p className="text-xs font-medium text-slate-500 mb-2">CCF 等级</p><div className="flex flex-wrap gap-1.5">{ALL_LEVELS.map(l => <button key={l} onClick={() => setLevelFilter(levelFilter === l ? null : l)} className={cn('px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border', levelFilter === l ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300')}>CCF-{l}</button>)}</div></div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{filtered.map(c => (
          <div key={c.id} className="relative group">
            <ConferenceCard conference={c} />
            <button onClick={(e) => { e.stopPropagation(); openEdit(c) }}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-white border border-slate-200 shadow-sm hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
              <Pencil className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        ))}</div>
      ) : <EmptyState title="没有匹配的会议" action={<Button variant="outline" size="sm" onClick={clearFilters}>清除筛选</Button>} />}

      {/* Edit Dialog */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setEditTarget(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-slate-900 mb-4">编辑 {editTarget.name} {editTarget.year}</h2>
            <div className="space-y-3">
              <div className="space-y-1.5"><Label>年份</Label><Input type="number" value={editForm.year} onChange={e => setEditForm({ ...editForm, year: Number(e.target.value) })} /></div>
              <div className="space-y-1.5"><Label>Abstract DDL</Label><Input type="date" value={editForm.abstractDeadline} onChange={e => setEditForm({ ...editForm, abstractDeadline: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Full Paper DDL</Label><Input type="date" value={editForm.fullPaperDeadline} onChange={e => setEditForm({ ...editForm, fullPaperDeadline: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>官网</Label><Input value={editForm.website} onChange={e => setEditForm({ ...editForm, website: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>地点</Label><Input value={editForm.location} onChange={e => setEditForm({ ...editForm, location: e.target.value })} /></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setEditTarget(null)}>取消</Button>
              <Button onClick={saveEdit}>保存</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
