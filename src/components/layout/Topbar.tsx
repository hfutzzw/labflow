'use client'

import { usePathname } from 'next/navigation'
import { ChevronRight, LogOut } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const breadcrumbMap: Record<string, string> = {
  '/': '首页',
  '/students': '学生管理',
  '/tasks': '任务看板',
  '/achievements': '学生成果',
  '/conferences': '顶会 DDL',
  '/interviews': '招生面试',
  '/meetings': '组会管理',
  '/settings': '设置',
}

function getBreadcrumbs(pathname: string): { label: string; href: string; active: boolean }[] {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return [{ label: '首页', href: '/', active: true }]

  const crumbs = [{ label: '首页', href: '/', active: false }]
  let currentPath = ''

  segments.forEach((seg, i) => {
    currentPath += `/${seg}`
    const isLast = i === segments.length - 1

    // For student detail page
    if (segments[0] === 'students' && i === 1 && !isNaN(Number(seg))) {
      crumbs.push({ label: '学生详情', href: currentPath, active: isLast })
    } else {
      const label = breadcrumbMap[currentPath] || seg
      crumbs.push({ label, href: currentPath, active: isLast })
    }
  })

  return crumbs
}

export default function Topbar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const breadcrumbs = getBreadcrumbs(pathname)
  const today = format(new Date(), 'yyyy年M月d日 EEEE')

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 lg:px-6 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center gap-2 text-sm min-w-0">
        {breadcrumbs.map((crumb, i) => (
          <div key={crumb.href} className="flex items-center gap-2 min-w-0">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
            <span className={cn('transition-colors truncate', crumb.active ? 'text-slate-900 font-semibold' : 'text-slate-400')}>
              {crumb.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs text-slate-400 hidden md:block">{today}</span>
        <span className="text-xs text-slate-300 hidden md:block">{user?.email}</span>
        <button onClick={signOut} className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50">
          <LogOut className="w-3.5 h-3.5" />退出
        </button>
      </div>
    </header>
  )
}
