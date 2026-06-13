import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import AppProvider from '@/components/layout/AppProvider'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LabFlow｜课题组科研进度管理平台',
  description: '统一管理学生、任务、论文、组会与顶会 DDL',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased pb-16 lg:pb-0">
        <AppProvider>{children}</AppProvider>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  )
}
