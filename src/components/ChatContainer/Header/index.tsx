import { FC, useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { useAppSelector } from '@/hooks/redux'
import { listenActiveUsers } from '@/services/database/room'
import { FaUser } from 'react-icons/fa'

export const RoomInput: FC = () => {
  const currentRoom = useAppSelector(state => state.room)
  const [roomName, setRoomName] = useState<string>('')
  const [editing, setEditing] = useState<boolean>(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setRoomName('')
  }

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value)
  }

  const handleFocus = () => {
    setEditing(true)
  }

  const handleBlur = () => {
    setEditing(false)
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <input
        className="w-full rounded-full bg-transparent py-2 text-base font-bold text-white
      placeholder:bg-soft-dark placeholder:p-5 placeholder:text-soft-gray"
        value={editing ? roomName : currentRoom.name}
        onChange={handleRoomNameChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Código da sala"
        title="Inserir código de sala privada"
      />
    </form>
  )
}

export const UserCounter: FC = () => {
  const currentRoom = useAppSelector(state => state.room)
  const [userCounter, setUserCounter] = useState<number>(
    currentRoom.active_users?.length ?? 0
  )

  useEffect(() => {
    if (currentRoom.id !== '') {
      const handleActiveUsersListener = listenActiveUsers(
        currentRoom.id,
        setUserCounter
      )
      handleActiveUsersListener.on()
      return () => {
        handleActiveUsersListener.off()
      }
    }
  }, [currentRoom.id])

  return <p className="text-sm text-white">{userCounter}/5</p>
}

const Header: FC = () => {
  return (
    <header className="flex h-16 items-center space-x-5 border-b-[1px] border-soft-dark px-10">
      <RoomInput />
      <UserCounter />
      <FaUser className="text-white" size={16} />
    </header>
  )
}

export default Header
