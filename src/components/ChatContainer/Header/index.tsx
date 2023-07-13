import type { FC } from 'react'
import { FaUser } from 'react-icons/fa'

const Header: FC = () => {
  return (
    <header className="flex h-16 items-center space-x-5 border-b-[1px] border-soft-dark px-10">
      <input
        className="w-full rounded-full bg-transparent py-2 text-base font-bold text-white
        placeholder:bg-soft-dark placeholder:p-5 placeholder:text-soft-gray"
        defaultValue="Sala 1"
        placeholder="Código da sala"
        title="Inserir código de sala privada"
      />
      <p className="text-sm text-white">1/5</p>
      <FaUser className="text-white" size={16} />
    </header>
  )
}

export default Header
