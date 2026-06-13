import { Student } from '@/types'
import { cn, relativeTime } from '@/lib/utils'
import StatusBadge from './StatusBadge'
import Link from 'next/link'

export default function StudentCard({ student, className }: { student: Student; className?: string }) {
  const degreeLabel = student.degree === 'master' ? '硕士' : '本科'
  const initials = student.name.slice(0, 1)

  return (
    <Link href={`/students/${student.id}`}>
      <div className={cn('p-5 bg-white rounded-2xl border border-slate-200 card-hover cursor-pointer', className)}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white text-sm font-bold shadow-sm shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-slate-900 truncate">{student.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-slate-500">{student.grade}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">{degreeLabel}</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 mb-2">{student.researchDirection}</p>
        {student.currentProject && (
          <p className="text-[11px] text-slate-400 truncate mb-3">{student.currentProject}</p>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <StatusBadge status={student.status} />
          <span className="text-[10px] text-slate-400">{relativeTime(student.lastUpdated)}</span>
        </div>
      </div>
    </Link>
  )
}
