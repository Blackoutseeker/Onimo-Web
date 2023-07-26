import { FC, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setPublicRoom } from '@/services/database/room'
import { setCurrentRoom } from '@/services/store/ducks/room'
import { AiOutlineInfoCircle, AiOutlinePlus } from 'react-icons/ai'
import RoomsList from '../RoomsList'
import InfoModal from '../InfoModal'

const RoomsContainer: FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  const modalReference = useRef<HTMLDialogElement>(null)

  const showModal = () => {
    modalReference.current?.showModal()
  }

  const createPublicRoom = async () => {
    const publicRoom = await setPublicRoom()
    if (publicRoom) {
      dispatch(setCurrentRoom(publicRoom))
    }
  }

  return (
    <>
      <div
        className="flex h-screen w-full flex-col border-r-[1px] border-soft-dark
        md:h-[calc(100vh-128px)] md:max-w-[300px]"
      >
        <header
          className="flex h-16 items-center justify-between 
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
          onClick={createPublicRoom}
        >
          <div>
            <AiOutlinePlus className="text-white" size={20} />
          </div>
          <h4 className="text-left font-bold text-white">Criar sala pública</h4>
        </button>
        <button className="flex items-center space-x-5 px-10 py-5 duration-150 hover:bg-soft-dark">
          <div>
            <AiOutlinePlus className="text-white" size={20} />
          </div>
          <h4 className="text-left font-bold text-white">Criar sala privada</h4>
        </button>

        <RoomsList />
      </div>
      <InfoModal modalReference={modalReference} />
    </>
  )
}

export default RoomsContainer
