import styles from './styles.module.css'
import { FC, useState, useEffect, memo } from 'react'
import type { Room } from '@/entities/room'
import { BsFillPersonFill } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
  listenRooms,
  getActiveUsers,
  handleRoomChange
} from '@/services/database/room'
import { setCurrentRoom } from '@/services/store/ducks/room'

interface RoomItemProps {
  index: number
  room: Room
  isCurrentRoom: boolean
  changeRoom: (room: Room) => Promise<void>
}

const RoomItem: FC<RoomItemProps> = ({
  index,
  room,
  isCurrentRoom,
  changeRoom
}) => {
  const handleChangeRoom = () => changeRoom(room)

  return (
    <li data-cy={`public-room-${index}`}>
      <button
        className={`flex w-full items-center space-x-5 px-10 py-5 duration-150 hover:bg-soft-dark ${
          isCurrentRoom ? 'bg-soft-dark' : 'bg-transparent'
        }`}
        onClick={handleChangeRoom}
      >
        <h4 className="w-full text-left font-bold text-white">{room.name}</h4>
        <h5 className="text-left text-sm text-white">
          {room.active_users?.length ?? 0}/5
        </h5>
        <div>
          <BsFillPersonFill className="text-white" size={20} />
        </div>
      </button>
    </li>
  )
}

const RoomItemMemoized = memo(RoomItem)

interface RoomsListProps {
  toggleView: () => void
}

const RoomsList: FC<RoomsListProps> = ({ toggleView }) => {
  const dispatch = useAppDispatch()
  const currentRoom = useAppSelector(state => state.room)
  const user = useAppSelector(state => state.user)
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    const handleRoomsListener = listenRooms(setRooms)
    handleRoomsListener.on()
    return () => {
      handleRoomsListener.off()
    }
  }, [])

  const changeRoom = async (room: Room) => {
    const activeUsers = await getActiveUsers(room.id)
    if (activeUsers < 5) {
      await handleRoomChange(currentRoom, room, user.id)
      dispatch(setCurrentRoom(room))
      toggleView()
    }
  }

  const renderRoomItems = () =>
    rooms.map((room, index) => (
      <RoomItemMemoized
        key={room.id}
        index={index + 1}
        room={room}
        isCurrentRoom={currentRoom.id === room.id}
        changeRoom={changeRoom}
      />
    ))

  if (rooms.length === 0)
    return (
      <div className="flex flex-1 items-center justify-center px-10 py-5">
        <p className="text-center text-sm text-soft-gray">
          Nenhuma sala pública disponível no momento. Sinta-se livre para criar
          uma nova.
        </p>
      </div>
    )

  return (
    <ol
      className={`max-h-full overflow-y-auto ${styles.roomsList}`}
      data-cy="rooms-list"
    >
      {renderRoomItems()}
    </ol>
  )
}

export default RoomsList
