import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { auth } from '@/lib/auth'

interface User {
  id: string
  name: string
  email: string
  image?: string
  role: string
  tenantId: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) -> Promise<{ success: boolean, error?: string, user?: User }>
  signUp: (userData: any) -> Promise<{ success: boolean, error?: string, user?: User }>
  signOut: () -> Promise<{ success: boolean }>
  getToken: () -> Promise<string>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize auth state from server
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = await auth.api.getSession()
        if (session?.user) {
          setUser({
            id: session.user.id,
            name: session.user.name || '',
            email: session.user.email || '',
            image: session.user.image || '',
            role: session.user.role || 'customer',
            tenantId: session.user.tenantId || '',
          })
        }
        setLoading(false)
      } catch (error) {
        console.error('Error initializing auth:', error)
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await auth.api.signIn.email({
        email,
        password,
        callbackURL: '/dashboard',
        fetchOptions: {
          onSuccess: (ctx) => {
            setUser({
              id: ctx.data.user.id,
              name: ctx.data.user.name || '',
              email: ctx.data.user.email || '',
              image: ctx.data.user.image || '',
              role: ctx.data.user.role || 'customer',
              tenantId: ctx.data.user.tenantId || '',
            })
          },
          onError: (ctx) => {
            console.error('Sign-in error:', ctx.error)
          },
        },
      })

      if (error) {
        return { success: false, error: error.message || 'Sign-in failed' }
      }

      return { 
        success: !!data?.user, 
        error: undefined, 
        user: data?.user ? {
          id: data.user.id,
          name: data.user.name || '',
          email: data.user.email || '',
          image: data.user.image || '',
          role: data.user.role || 'customer',
          tenantId: data.user.tenantId || '',
        } : undefined
      }
    } catch (error) {
      return { success: false, error: 'Network error during sign-in' }
    }
  }

  const signUp = async (userData: any) => {
    try {
      const { data, error } = await auth.api.signUp.email({
        ...userData,
        callbackURL: '/dashboard',
        fetchOptions: {
          onSuccess: (ctx) => {
            setUser({
              id: ctx.data.user.id,
              name: ctx.data.user.name || '',
              email: ctx.data.user.email || '',
              image: ctx.data.user.image || '',
              role: ctx.data.user.role || 'customer',
              tenantId: ctx.data.user.tenantId || '',
            })
          },
          onError: (ctx) => {
            console.error('Sign-up error:', ctx.error)
          },
        },
      })

      if (error) {
        return { success: false, error: error.message || 'Sign-up failed' }
      }

      return {
        success: !!data?.user,
        error: undefined,
        user: data?.user ? {
          id: data.user.id,
          name: data.user.name || '',
          email: data.user.email || '',
          image: data.user.image || '',
          role: data.user.role || 'customer',
          tenantId: data.user.tenantId || '',
        } : undefined
      }
    } catch (error) {
      return { success: false, error: 'Network error during sign-up' }
    }
  }

  const signOut = async () => {
    try {
      await auth.api.signOut()
      setUser(null)
      return { success: true }
    } catch (error) {
      console.error('Sign-out error:', error)
      return { success: false }
    }
  }

  const getToken = async () => {
    try {
      const session = await auth.api.getSession()
      return session?.token || ''
    } catch (error) {
      console.error('Error getting token:', error)
      return ''
    }
  }

  const value = { user, loading, signIn, signUp, signOut, getToken }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}