import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, isAfter, isBefore, differenceInDays, parseISO } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string, fmt: string = 'yyyy-MM-dd'): string {
  return format(parseISO(date), fmt)
}

export function formatDateTime(date: string): string {
  return format(parseISO(date), 'yyyy-MM-dd HH:mm')
}

export function daysUntil(date: string): number {
  if (!date) return 999
  try { return differenceInDays(parseISO(date), new Date()) }
  catch { return 999 }
}

export function daysAgo(date: string): number {
  return differenceInDays(new Date(), parseISO(date))
}

export function relativeTime(date: string | undefined): string {
  if (!date) return '未知'
  try { return formatDistanceToNow(parseISO(date), { addSuffix: true, locale: zhCN }) }
  catch { return date }
}

export function isPast(date: string): boolean {
  return isBefore(parseISO(date), new Date())
}

export function isFuture(date: string): boolean {
  return isAfter(parseISO(date), new Date())
}

export function getDdlUrgency(daysRemaining: number): 'normal' | 'warning' | 'critical' | 'expired' {
  if (daysRemaining < 0) return 'expired'
  if (daysRemaining <= 14) return 'critical'
  if (daysRemaining <= 30) return 'warning'
  return 'normal'
}

export function getRiskColor(level: string): string {
  switch (level) {
    case 'low': return 'text-emerald-600 bg-emerald-50 border-emerald-200'
    case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200'
    case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
    case 'critical': return 'text-red-600 bg-red-50 border-red-200'
    default: return 'text-slate-600 bg-slate-50 border-slate-200'
  }
}

export function getRiskDotColor(level: string): string {
  switch (level) {
    case 'low': return 'bg-emerald-400'
    case 'medium': return 'bg-amber-400'
    case 'high': return 'bg-orange-400'
    case 'critical': return 'bg-red-400'
    default: return 'bg-slate-400'
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
    case 'done':
    case 'completed':
    case 'accepted':
      return 'text-emerald-600 bg-emerald-50 border-emerald-200'
    case 'in_progress':
    case 'ongoing':
    case 'writing':
    case 'submission':
    case 'rebuttal':
      return 'text-blue-600 bg-blue-50 border-blue-200'
    case 'blocked':
    case 'suspended':
      return 'text-red-600 bg-red-50 border-red-200'
    case 'pending_feedback':
    case 'pending':
      return 'text-amber-600 bg-amber-50 border-amber-200'
    case 'todo':
      return 'text-slate-500 bg-slate-50 border-slate-200'
    case 'upcoming':
      return 'text-violet-600 bg-violet-50 border-violet-200'
    case 'cancelled':
    case 'graduated':
      return 'text-slate-400 bg-slate-50 border-slate-200'
    default:
      return 'text-slate-600 bg-slate-50 border-slate-200'
  }
}

export function getProgressColor(progress: number): string {
  if (progress >= 80) return 'bg-emerald-500'
  if (progress >= 50) return 'bg-blue-500'
  if (progress >= 30) return 'bg-amber-500'
  return 'bg-slate-300'
}

export function getTaskTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    read_paper: '📄',
    reproduce_baseline: '🔄',
    run_experiment: '🧪',
    write_paper: '✍️',
    make_figure: '📊',
    organize_table: '📋',
    prepare_meeting: '🎤',
    submission: '📬',
    rebuttal: '🛡️',
    thesis: '📝',
    project_material: '📦',
  }
  return icons[type] || '📌'
}

export function getProjectStageIcon(stage: string): string {
  const icons: Record<string, string> = {
    idea: '💡',
    survey: '🔍',
    reproduction: '🔄',
    main_experiment: '🧪',
    ablation: '🔬',
    writing: '✍️',
    submission: '📬',
    rebuttal: '🛡️',
    accepted: '🎉',
    rejected_resubmit: '🔄',
  }
  return icons[stage] || '📌'
}

export function safeFormatDate(dateStr: string, fmt: string = 'MMM dd, yyyy'): string {
  if (!dateStr) return 'TBA'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return 'TBA'
  return format(d, fmt)
}

export function safeDaysUntil(dateStr: string): number {
  if (!dateStr) return 999
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return 999
  return differenceInDays(d, new Date())
}

export function getInitials(name: string): string {
  return name.slice(0, 1) || '?'
}

export function truncate(str: string, len: number): string {
  if (str.length <= len) return str
  return str.slice(0, len) + '...'
}
