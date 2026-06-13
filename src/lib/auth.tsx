'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase/client'

interface AuthState {
  user: { email: string } | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<string | null>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthState>({
  user: null, loading: true,
  signIn: async () => null,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ? { email: data.session.user.email! } : null)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { email: session.user.email! } : null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return error.message
    return null
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
