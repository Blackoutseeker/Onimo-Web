import { FC, useState, useEffect, memo } from 'react'
import type { Room } from '@/entities/room'
import { listenRooms } from '@/services/database/room'
import { BsFillPersonFill } from 'react-icons/bs'

interface RoomItemProps {
  room: Room
}

const RoomItem: FC<RoomItemProps> = ({ room }) => {
  return (
    <li>
      <button className="flex w-full items-center space-x-5 px-10 py-5 duration-150 hover:bg-soft-dark">
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
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    const handleRoomsListener = listenRooms(setRooms)
    handleRoomsListener.on()
    return () => {
      handleRoomsListener.off()
    }
  }, [])

  const renderRoomItems = () =>
    rooms.map(room => <RoomItemMemoized key={room.id} room={room} />)

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
