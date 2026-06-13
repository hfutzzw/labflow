'use client'

import { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import SectionHeader from '@/components/shared/SectionHeader'
import ProjectCard from '@/components/shared/ProjectCard'
import ProgressBar from '@/components/shared/ProgressBar'
import { useStore } from '@/lib/store'
import { Project, PROJECT_STAGE_LABELS } from '@/types'
import { Lightbulb, Shield, ArrowRight, Target } from 'lucide-react'

export default function ProjectsPage() {
  const { state } = useStore()
  const { projects, students, conferences } = state
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = projects.filter(p => {
    if (!search) return true
    const q = search.toLowerCase()
    return p.title.toLowerCase().includes(q) || p.researchDirection.toLowerCase().includes(q)
  })

  const getName = (id: string) => students.find(s => s.id === id)?.name || '未知'
  const getConf = (id?: string) => id ? conferences.find(c => c.id === id)?.name : undefined

  return (
    <div className="max-w-[1440px] mx-auto space-y-6">
      <SectionHeader title="论文 / Idea 项目" description={`共 ${projects.length} 个项目`}
        action={<div className="flex gap-3"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><Input placeholder="搜索项目..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 w-56 bg-white border-slate-200" /></div><Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" />新建项目</Button></div>} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(p => <ProjectCard key={p.id} project={p} leadName={getName(p.leadStudentId)} participantNames={p.participantIds.map(getName)} conferenceName={getConf(p.targetConferenceId)} onClick={() => setSelected(p)} />)}
      </div>

      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && (
          <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
            <SheetHeader className="mb-6"><SheetTitle className="text-lg font-bold">{selected.title}</SheetTitle></SheetHeader>
            <div className="space-y-6">
              <div className="space-y-3 text-sm text-slate-600">
                <p>负责人：<span className="font-medium text-slate-900">{getName(selected.leadStudentId)}</span></p>
                <p>参与：<span className="font-medium text-slate-900">{selected.participantIds.map(getName).join('、')}</span></p>
                {selected.targetConferenceId && <p className="flex items-center gap-2"><Target className="w-4 h-4" />{getConf(selected.targetConferenceId)}</p>}
              </div>
              <div className="space-y-3"><ProgressBar value={selected.experimentProgress} label="实验" /><ProgressBar value={selected.writingProgress} label="写作" /><ProgressBar value={selected.figureProgress} label="图表" /><ProgressBar value={selected.ablationProgress} label="消融" /><ProgressBar value={selected.supplementaryProgress} label="Supplementary" /></div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100"><p className="text-xs font-semibold text-amber-800 mb-1"><Lightbulb className="w-3.5 h-3.5 inline mr-1" />核心 Contribution</p><p className="text-sm text-amber-900">{selected.coreContribution}</p></div>
              <div className="p-4 rounded-2xl bg-red-50 border border-red-100"><p className="text-xs font-semibold text-red-800 mb-1"><Shield className="w-3.5 h-3.5 inline mr-1" />Reviewer Attack Risk</p><p className="text-sm text-red-900">{selected.reviewerAttackRisk}</p></div>
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100"><p className="text-xs font-semibold text-sky-800 mb-1"><ArrowRight className="w-3.5 h-3.5 inline mr-1" />下一步</p><p className="text-sm text-sky-900">{selected.nextStep}</p></div>
            </div>
          </SheetContent>
        )}
      </Sheet>
    </div>
  )
}
