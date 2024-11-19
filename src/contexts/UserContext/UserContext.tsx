'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

type UserContextType = {
  user: User | null
  setUser: (user: User | null) => void
  userIsLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [userIsLoading, setUserIsLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const resp = await supabase.auth.getUser()

      if (resp.data.user) {
        setUser(resp.data.user)
      }
    }

    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, userIsLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  const router = useRouter()

  const signOut = async () => {
    const { error } = await createClient().auth.signOut()
    if (error) {
      toast.error('Sign out error')
      return
    }

    router.replace('/login')
    context?.setUser(null)
  }

  const signIn = async ({ email = '', password = '' }) => {
    if (!email || !password) {
      toast.error('Sign in error')
      return
    }

    const { data, error } = await createClient().auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error('Sign in error')
      return
    }

    context?.setUser(data.user)
    router.replace('/')
    router.refresh()
  }

  const signUp = async ({ email = '', password = '' }) => {
    if (!email || !password) {
      toast.error('Sign in error')
      return
    }

    const { data, error: signUpError } = await createClient().auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      toast.error('Sign Up error')
      return
    }

    toast.success(`${email} Signed Up`)

    context?.setUser(data.user)
    router.replace('/')
    router.refresh()
  }

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return {
    ...context,
    signIn,
    signOut,
    signUp,
  }
}
