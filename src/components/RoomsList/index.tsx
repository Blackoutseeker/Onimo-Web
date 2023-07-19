import { FC, useState, useEffect, memo } from 'react'
import type { Room } from '@/entities/room'
import { BsFillPersonFill } from 'react-icons/bs'
import { useAppDispatch } from '@/hooks/redux'
import { listenRooms } from '@/services/database/room'
import { setCurrentRoom } from '@/services/store/ducks/room'

interface RoomItemProps {
  room: Room
  changeRoom: (room: Room) => void
}

const RoomItem: FC<RoomItemProps> = ({ room, changeRoom }) => {
  const handleChangeRoom = () => changeRoom(room)

  return (
    <li>
      <button
        className="flex w-full items-center space-x-5 px-10 py-5 duration-150 hover:bg-soft-dark"
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

const RoomsList: FC = () => {
  const dispatch = useAppDispatch()
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    const handleRoomsListener = listenRooms(setRooms)
    handleRoomsListener.on()
    return () => {
      handleRoomsListener.off()
    }
  }, [])

  const changeRoom = (room: Room) => {
    dispatch(setCurrentRoom(room))
  }

  const renderRoomItems = () =>
    rooms.map(room => (
      <RoomItemMemoized key={room.id} room={room} changeRoom={changeRoom} />
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

  return <ol className="max-h-full overflow-y-auto">{renderRoomItems()}</ol>
}

export default RoomsList
