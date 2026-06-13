'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Users, Kanban, Calendar,
  UsersRound, Settings, FlaskConical,
} from 'lucide-react'
import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const navItems = [
  { href: '/', label: '总览', icon: LayoutDashboard },
  { href: '/students', label: '学生管理', icon: Users },
  { href: '/tasks', label: '任务看板', icon: Kanban },
  { href: '/achievements', label: '学生成果', icon: FlaskConical },
  { href: '/conferences', label: '顶会 DDL', icon: Calendar },
  { href: '/meetings', label: '组会管理', icon: UsersRound },
  { href: '/settings', label: '设置', icon: Settings },
]

export default function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={cn(
      'fixed left-0 top-0 z-40 h-screen flex flex-col hidden lg:flex',
      'bg-white border-r border-slate-200',
      'transition-all duration-300',
      collapsed ? 'w-[60px]' : 'w-[224px]'
    )}>
      {/* Logo */}
      <div className={cn('flex items-center h-14 px-4 border-b border-slate-100', collapsed ? 'justify-center' : 'gap-3')}>
        {/* Abstract hexagon/node logo */}
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="shrink-0">
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="30" y2="30">
              <stop stopColor="#4F46E5" />
              <stop offset="1" stopColor="#0EA5E9" />
            </linearGradient>
          </defs>
          <circle cx="15" cy="15" r="14" stroke="url(#logoGrad)" strokeWidth="1.5" fill="none" opacity="0.3" />
          <circle cx="15" cy="15" r="8" stroke="url(#logoGrad)" strokeWidth="1" fill="none" opacity="0.5" />
          <circle cx="15" cy="15" r="3" fill="url(#logoGrad)" />
          <line x1="15" y1="7" x2="15" y2="12" stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="15" y1="18" x2="15" y2="23" stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="7" y1="15" x2="12" y2="15" stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="15" x2="23" y2="15" stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {!collapsed && (
          <div className="flex flex-col leading-none min-w-0">
            <span className="text-sm font-bold tracking-tight text-slate-900">LabFlow</span>
            <span className="text-[10px] text-slate-400 font-medium">课题组科研管理平台</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2.5 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          const Icon = item.icon

          const link = (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-150',
                isActive
                  ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50',
                collapsed && 'justify-center px-2'
              )}
            >
              <Icon className={cn('w-[18px] h-[18px] shrink-0', isActive && 'text-indigo-600')} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )

          if (collapsed) {
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger>{link}</TooltipTrigger>
                <TooltipContent side="right" className="ml-2 text-xs">{item.label}</TooltipContent>
              </Tooltip>
            )
          }
          return link
        })}
      </nav>

      {/* Footer */}
      <div className="p-2.5 border-t border-slate-100">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'flex items-center gap-2 w-full px-3 py-2 rounded-xl text-[11px] font-medium text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors',
            collapsed && 'justify-center px-2'
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {!collapsed && '收起'}
        </button>
      </div>
    </aside>
  )
}
