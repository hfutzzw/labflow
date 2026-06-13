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
          <AppSidebar />
          <div className="flex-1 flex flex-col ml-[224px]">
            <Topbar />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      </TooltipProvider>
    </StoreProvider>
  )
}
