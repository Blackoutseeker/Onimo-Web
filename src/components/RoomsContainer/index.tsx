import type { FC } from 'react'
import { AiOutlineInfoCircle, AiOutlinePlus } from 'react-icons/ai'
import RoomsList from '../RoomsList'

const RoomsContainer: FC = () => {
  return (
    <div
      className="flex flex-col h-screen md:h-[calc(100vh-128px)] w-full md:max-w-[300px]
      border-r-[1px] border-soft-dark"
    >
      <header
        className="flex items-center justify-between border-b-[1px] 
      border-soft-dark h-16 px-10"
      >
        <h3 className="text-xl font-bold text-white">john_doe7</h3>
        <button title="Informações" aria-label="Informações">
          <AiOutlineInfoCircle className="text-soft-gray" size={24} />
        </button>
      </header>

      <button className="flex items-center px-10 py-5 space-x-5 duration-150 hover:bg-soft-dark">
        <div>
          <AiOutlinePlus className="text-white" size={20} />
        </div>
        <h4 className="font-bold text-left text-white">Criar sala pública</h4>
      </button>
      <button className="flex items-center px-10 py-5 space-x-5 duration-150 hover:bg-soft-dark">
        <div>
          <AiOutlinePlus className="text-white" size={20} />
        </div>
        <h4 className="font-bold text-left text-white">Criar sala privada</h4>
      </button>

      <RoomsList />
    </div>
  )
}

export default RoomsContainer
