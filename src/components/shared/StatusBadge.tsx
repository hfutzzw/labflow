import { cn } from '@/lib/utils'

const styles: Record<string, string> = {
  active:           'text-emerald-700 bg-emerald-50 border-emerald-200',
  in_progress:      'text-sky-700 bg-sky-50 border-sky-200',
  ongoing:          'text-sky-700 bg-sky-50 border-sky-200',
  done:             'text-slate-500 bg-slate-100 border-slate-200',
  completed:        'text-slate-500 bg-slate-100 border-slate-200',
  accepted:         'text-emerald-700 bg-emerald-50 border-emerald-200',
  blocked:          'text-red-700 bg-red-50 border-red-200',
  suspended:        'text-red-700 bg-red-50 border-red-200',
  pending_feedback: 'text-amber-700 bg-amber-50 border-amber-200',
  pending:          'text-amber-700 bg-amber-50 border-amber-200',
  todo:             'text-slate-500 bg-slate-100 border-slate-200',
  upcoming:         'text-indigo-700 bg-indigo-50 border-indigo-200',
  cancelled:        'text-slate-400 bg-slate-50 border-slate-200',
  graduated:        'text-slate-400 bg-slate-50 border-slate-200',
  leave:            'text-amber-700 bg-amber-50 border-amber-200',
  presenting:       'text-sky-700 bg-sky-50 border-sky-200',
}

export default function StatusBadge({ status, label, className }: { status: string; label?: string; className?: string }) {
  const s = styles[status] || 'text-slate-500 bg-slate-100 border-slate-200'
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold border', s, className)}>
      <span className={cn('status-dot', status === 'active' || status === 'done' || status === 'completed' || status === 'accepted' ? 'bg-emerald-500' :
        status === 'in_progress' || status === 'ongoing' || status === 'presenting' ? 'bg-sky-500' :
        status === 'blocked' || status === 'suspended' ? 'bg-red-500' :
        status === 'pending' || status === 'pending_feedback' ? 'bg-amber-500' :
        status === 'upcoming' ? 'bg-indigo-500' : 'bg-slate-400')} />
      {label || status}
    </span>
  )
}
