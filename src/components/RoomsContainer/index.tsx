import { HTMLAttributes, FC, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
  setPublicRoom,
  handleRoomChange,
  setPrivateRoom
} from '@/services/database/room'
import { setCurrentRoom } from '@/services/store/ducks/room'
import { AiOutlineInfoCircle, AiOutlinePlus } from 'react-icons/ai'
import RoomsList from '../RoomsList'
import InfoModal from '../InfoModal'

interface RoomsContainerProps {
  className?: HTMLAttributes<HTMLDivElement>['className']
  toggleView: () => void
}

const RoomsContainer: FC<RoomsContainerProps> = ({ className, toggleView }) => {
  const dispatch = useAppDispatch()
  const currentRoom = useAppSelector(state => state.room)
  const user = useAppSelector(state => state.user)
  const modalReference = useRef<HTMLDialogElement>(null)

  const showModal = () => {
    modalReference.current?.showModal()
  }

  const createPublicRoom = async () => {
    const publicRoom = await setPublicRoom()
    if (publicRoom) {
      await handleRoomChange(currentRoom, publicRoom, user.id)
      dispatch(setCurrentRoom(publicRoom))
      toggleView()
    }
  }

  const createPrivateRoom = async () => {
    const privateRoom = await setPrivateRoom(user.id)
    await handleRoomChange(currentRoom, privateRoom, user.id, true)
    dispatch(setCurrentRoom(privateRoom))
    toggleView()
  }

  return (
    <>
      <div
        className={`flex h-screen w-full flex-col border-r-[1px] border-soft-dark
        md:h-[calc(100vh-128px)] md:max-w-[300px] ${className}`}
      >
        <header
          className="flex min-h-[64px] items-center justify-between 
          border-b-[1px] border-soft-dark px-10"
        >
          <h3 className="text-xl font-bold text-white">{user.nickname}</h3>
          <button
            title="Informações"
            aria-label="Informações"
            onClick={showModal}
          >
            <AiOutlineInfoCircle className="text-soft-gray" size={24} />
          </button>
        </header>

        <button
          className="flex items-center space-x-5 px-10 py-5 duration-150 hover:bg-soft-dark"
          data-cy="create-public-room-button"
          onClick={createPublicRoom}
        >
          <div>
            <AiOutlinePlus className="text-white" size={20} />
          </div>
          <h4 className="text-left font-bold text-white">Criar sala pública</h4>
        </button>
        <button
          className="flex items-center space-x-5 px-10 py-5 duration-150 hover:bg-soft-dark"
          data-cy="create-private-room-button"
          onClick={createPrivateRoom}
        >
          <div>
            <AiOutlinePlus className="text-white" size={20} />
          </div>
          <h4 className="text-left font-bold text-white">Criar sala privada</h4>
        </button>

        <RoomsList toggleView={toggleView} />
      </div>
      <InfoModal modalReference={modalReference} />
    </>
  )
}

export default RoomsContainer
