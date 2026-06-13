'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Users, Kanban, Calendar,
  UsersRound, Settings, FlaskConical, GraduationCap,
} from 'lucide-react'
import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const navItems = [
  { href: '/', label: '总览', icon: LayoutDashboard },
  { href: '/students', label: '学生', icon: Users },
  { href: '/tasks', label: '任务', icon: Kanban },
  { href: '/achievements', label: '成果', icon: FlaskConical },
  { href: '/interviews', label: '招生', icon: GraduationCap },
  { href: '/conferences', label: '顶会', icon: Calendar },
  { href: '/meetings', label: '组会', icon: UsersRound },
]

export default function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={cn(
      'fixed left-0 top-0 z-40 h-screen flex flex-col hidden lg:flex',
      'bg-white border-r border-sidebar-border',
      'transition-all duration-300',
      collapsed ? 'w-[60px]' : 'w-[260px]'
    )}>
      <div className={cn('flex items-center h-14 px-4 border-b border-slate-50', collapsed ? 'justify-center' : 'gap-2.5')}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
          <defs><linearGradient id="lg2" x1="0" y1="0" x2="28" y2="28"><stop stopColor="#6366F1"/><stop offset="1" stopColor="#8B5CF6"/></linearGradient></defs>
          <circle cx="14" cy="14" r="12" stroke="url(#lg2)" strokeWidth="1.5" opacity="0.25"/>
          <circle cx="14" cy="14" r="6" stroke="url(#lg2)" strokeWidth="1.2" opacity="0.5"/>
          <circle cx="14" cy="14" r="2.5" fill="url(#lg2)"/>
        </svg>
        {!collapsed && <span className="text-sm font-bold tracking-tight text-slate-900">LabFlow</span>}
      </div>

      <nav className="flex-1 px-2.5 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(item => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          const Icon = item.icon
          const link = (
            <Link key={item.href} href={item.href} className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-lg font-medium transition-all duration-150',
              isActive ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50',
              collapsed && 'justify-center px-2'
            )}>
              <Icon className={cn('w-[20px] h-[20px] shrink-0', isActive && 'text-indigo-600')} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
          if (collapsed) return <Tooltip key={item.href}><TooltipTrigger>{link}</TooltipTrigger><TooltipContent side="right" className="ml-2 text-xs">{item.label}</TooltipContent></Tooltip>
          return link
        })}
      </nav>

      <div className="p-2.5 border-t border-slate-50">
        <button onClick={() => setCollapsed(!collapsed)} className={cn(
          'flex items-center gap-2 w-full px-3 py-2 rounded-xl text-[11px] font-medium text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors',
          collapsed && 'justify-center px-2'
        )}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {!collapsed && '收起'}
        </button>
      </div>
    </aside>
  )
}
