import { FC, useRef, useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import type { Room } from '@/entities/room'
import {
  checkIfPrivateRoomExists,
  handleRoomChange,
  listenActiveUsers
} from '@/services/database/room'
import { setCurrentRoom } from '@/services/store/ducks/room'
import { FaUser } from 'react-icons/fa'

export const RoomInput: FC = () => {
  const dispatch = useAppDispatch()
  const currentRoom = useAppSelector(state => state.room)
  const user = useAppSelector(state => state.user)
  const inputRef = useRef<HTMLInputElement>(null)
  const [roomName, setRoomName] = useState<string>('')
  const [editing, setEditing] = useState<boolean>(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (roomName.length === 4) {
      const privateRoom: Room = {
        id: roomName.toUpperCase(),
        name: roomName.toUpperCase()
      }
      const privateRoomExists = await checkIfPrivateRoomExists(privateRoom.id)
      if (privateRoomExists) {
        await handleRoomChange(currentRoom, privateRoom, user.id, true)
        dispatch(setCurrentRoom(privateRoom))
        inputRef.current?.blur()
      }
      setRoomName('')
    }
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
        ref={inputRef}
        maxLength={4}
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
      const isPrivateRoom = currentRoom.id === currentRoom.name
      const handleActiveUsersListener = listenActiveUsers(
        currentRoom.id,
        setUserCounter,
        isPrivateRoom
      )
      handleActiveUsersListener.on()
      return () => {
        handleActiveUsersListener.off()
      }
    }
  }, [currentRoom])

  const isPrivateRoom = currentRoom.id === currentRoom.name
  const maximumNumberOfUsers: number = isPrivateRoom ? 10 : 5

  return (
    <p className="text-sm text-white">
      {userCounter}/{maximumNumberOfUsers}
    </p>
  )
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
