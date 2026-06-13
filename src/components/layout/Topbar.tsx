'use client'

import { usePathname } from 'next/navigation'
import { ChevronRight, Search, Bell, Command } from 'lucide-react'
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
  const breadcrumbs = getBreadcrumbs(pathname)
  const today = format(new Date(), 'yyyy年M月d日 EEEE')

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-6 bg-background/80 backdrop-blur-md border-b border-border">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, i) => (
          <div key={crumb.href} className="flex items-center gap-2">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />}
            <span
              className={cn(
                'transition-colors',
                crumb.active
                  ? 'text-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground cursor-pointer'
              )}
            >
              {crumb.label}
            </span>
          </div>
        ))}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-4">
        {/* Date */}
        <span className="text-xs text-muted-foreground hidden md:block">{today}</span>

        <Separator orientation="vertical" className="h-5 hidden md:block" />

        {/* Search hint */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50 text-xs text-muted-foreground">
          <Command className="w-3 h-3" />
          <span>K</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
        </button>
      </div>
    </header>
  )
}
