'use client'

import { ReactNode } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { StoreProvider } from '@/lib/store'
import AppSidebar from './AppSidebar'
import Topbar from './Topbar'

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <TooltipProvider delay={300}>
        <div className="flex min-h-screen">
          {/* Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <AppSidebar />
          </div>
          {/* Main */}
          <div className="flex-1 flex flex-col w-full lg:ml-[224px]">
            <Topbar />
            <main className="flex-1 p-4 lg:p-6">
              {children}
            </main>
          </div>
          {/* Mobile bottom nav */}
          <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex justify-around py-2 safe-area-bottom">
            {[
              { href: '/', label: '总览' },
              { href: '/students', label: '学生' },
              { href: '/tasks', label: '任务' },
              { href: '/meetings', label: '组会' },
            ].map(item => (
              <a key={item.href} href={item.href}
                className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-slate-500 hover:text-indigo-600 px-3 py-1">
                <span className="text-base">
                  {item.href === '/' ? '📊' : item.href === '/students' ? '👥' : item.href === '/tasks' ? '📋' : '📅'}
                </span>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </TooltipProvider>
    </StoreProvider>
  )
}
