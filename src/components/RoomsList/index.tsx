import { FC, memo, useState } from 'react'
import type { Room } from '@/entities/room'
import { BsFillPersonFill } from 'react-icons/bs'

interface RoomItemProps {
  room: Room
}

const RoomItem: FC<RoomItemProps> = ({ room }) => {
  return (
    <li>
      <button className="flex items-center w-full px-10 py-5 space-x-5 duration-150 hover:bg-soft-dark">
        <h4 className="w-full font-bold text-left text-white">{room.name}</h4>
        <h5 className="text-sm text-left text-white">
          {room.activeUsers.length}/5
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
  const renderRoomItems = () =>
    rooms.map(room => <RoomItemMemoized key={room.id} room={room} />)

  if (rooms.length === 0)
    return (
      <div className="flex items-center justify-center flex-1 px-10 py-5">
        <p className="text-sm text-center text-soft-gray">
          Nenhuma sala pública disponível no momento. Sinta-se livre para criar
          uma nova.
        </p>
      </div>
    )

  return <ol className="max-h-full overflow-y-auto">{renderRoomItems()}</ol>
}

export default RoomsList
