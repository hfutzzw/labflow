'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FlaskConical, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const { signIn, user } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Already logged in
  if (user) {
    router.push('/')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const err = await signIn(email, password)
    if (err) setError(err)
    else router.push('/')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-4">
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="48" y2="48">
                <stop stopColor="#6366F1" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" stroke="url(#lg)" strokeWidth="2" opacity="0.3" />
            <circle cx="24" cy="24" r="12" stroke="url(#lg)" strokeWidth="1.5" opacity="0.5" />
            <circle cx="24" cy="24" r="4" fill="url(#lg)" />
          </svg>
          <h1 className="text-xl font-bold text-slate-900">LabFlow</h1>
          <p className="text-sm text-slate-500 mt-1">课题组科研管理平台</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="space-y-1.5">
            <Label>邮箱</Label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@lab.com" required />
          </div>
          <div className="space-y-1.5">
            <Label>密码</Label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••" required />
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 p-2.5 rounded-lg">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            登录
          </Button>
        </form>
      </div>
    </div>
  )
}
