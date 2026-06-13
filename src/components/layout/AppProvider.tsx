'use client'

import { ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { TooltipProvider } from '@/components/ui/tooltip'
import { StoreProvider } from '@/lib/store'
import { AuthProvider, useAuth } from '@/lib/auth'
import AppSidebar from './AppSidebar'
import Topbar from './Topbar'
import { Loader2 } from 'lucide-react'

function AppShell({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
      </div>
    )
  }

  // Not logged in, not on login page → redirect
  if (!user && pathname !== '/auth/login') {
    if (typeof window !== 'undefined') router.push('/auth/login')
    return null
  }

  // Logged in and on login page → redirect to home
  if (user && pathname === '/auth/login') {
    if (typeof window !== 'undefined') router.push('/')
    return null
  }

  // Not logged in, on login page → show login
  if (!user && pathname === '/auth/login') {
    return <>{children}</>
  }

  // Logged in → show app
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block">
        <AppSidebar />
      </div>
      <div className="flex-1 flex flex-col w-full lg:ml-[224px]">
        <Topbar />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex justify-around py-2">
        {[
          { href: '/', label: '总览' },
          { href: '/students', label: '学生' },
          { href: '/tasks', label: '任务' },
          { href: '/meetings', label: '组会' },
        ].map(item => (
          <a key={item.href} href={item.href}
            className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-slate-500 hover:text-indigo-600 px-3 py-1">
            <span className="text-base">{item.href === '/' ? '📊' : item.href === '/students' ? '👥' : item.href === '/tasks' ? '📋' : '📅'}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <StoreProvider>
        <TooltipProvider delay={300}>
          <AppShell>{children}</AppShell>
        </TooltipProvider>
      </StoreProvider>
    </AuthProvider>
  )
}
