import type { FC } from 'react'

const VoidChat: FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-176px)] items-center justify-center p-10 md:min-h-fit md:flex-grow">
      <p className="max-w-xs text-center text-soft-gray">
        Sempre mantenha o respeito aos demais usuários. Antes de enviar uma
        mensagem, pense em suas consequências.
      </p>
    </div>
  )
}

export default VoidChat
