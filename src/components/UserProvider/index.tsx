import { FC, ReactNode, useCallback, useEffect } from 'react'
import { useAppDispatch } from '@/hooks/redux'
import type { User } from '@/entities/user'
import { setUser } from '@/services/store/ducks/user'

interface UserProviderProps {
  children: ReactNode | ReactNode[]
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch()

  const fetchUserData = useCallback(async () => {
    const request = await fetch('/api/user', { method: 'GET' })
    const { user }: { user: User | undefined } = await request.json()
    if (user) dispatch(setUser(user))
  }, [dispatch])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  return <>{children}</>
}

export default UserProvider
