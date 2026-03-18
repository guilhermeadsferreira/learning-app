import { createContext, useContext, useEffect, useState, useMemo, type ReactNode } from 'react'
import type { User, Session } from '@/services/supabase/auth'
import { signInWithGitHub, signOut, getSession, onAuthStateChange } from '@/services/supabase/auth'

interface AuthContextValue {
  user: User | null
  session: Session | null
  isLoading: boolean
  signInWithGitHub: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSession().then((s) => {
      setSession(s)
      setUser(s?.user ?? null)
      setIsLoading(false)
    })

    const {
      data: { subscription },
    } = onAuthStateChange((_event, s) => {
      setSession(s)
      setUser(s?.user ?? null)
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      isLoading,
      signInWithGitHub,
      signOut,
    }),
    [user, session, isLoading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
