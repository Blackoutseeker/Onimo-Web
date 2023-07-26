import { FC, ReactNode, useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import type { User } from '@/entities/user'
import { setUser } from '@/services/store/ducks/user'
import { handleUserDisconnect } from '@/services/database/user'

interface UserProviderProps {
  children: ReactNode | ReactNode[]
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch()
  const room = useAppSelector(state => state.room)
  const user = useAppSelector(state => state.user)

  const fetchUserData = useCallback(async () => {
    const request = await fetch('/api/user', { method: 'GET' })
    const { user }: { user: User | undefined } = await request.json()
    if (user) dispatch(setUser(user))
  }, [dispatch])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  useEffect(() => {
    if (room.id !== '' && user.id !== '') {
      const isPrivateRoom = room.id === room.name
      handleUserDisconnect(room.id, isPrivateRoom, user.id)
    }
  }, [room, user.id])

  return <>{children}</>
}

export default UserProvider
