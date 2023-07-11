import styles from './styles.module.css'
import type { FC, RefObject } from 'react'
import { rules, information } from '@/utils/constants'
import { AiOutlineClose } from 'react-icons/ai'

interface InfoModalProps {
  modalReference: RefObject<HTMLDialogElement>
}

const InfoModal: FC<InfoModalProps> = ({ modalReference }) => {
  const closeModalFromOutside = (clientX: number, clientY: number) => {
    if (modalReference.current === null) return

    const modalDimensions = modalReference.current.getBoundingClientRect()
    if (
      clientX < modalDimensions.left ||
      clientX > modalDimensions.right ||
      clientY < modalDimensions.top ||
      clientY > modalDimensions.bottom
    ) {
      modalReference.current.close()
    }
  }

  const closeModal = () => {
    modalReference.current?.close()
  }

  const renderRules = () => rules.map(rule => <li key={rule}>{rule}</li>)
  const renderInformation = () =>
    information.map(info => <li key={info}>{info}</li>)

  return (
    <dialog
      className={`left-1/2 top-1/2 max-h-[80%] w-full -translate-x-1/2 -translate-y-1/2
      overflow-y-auto rounded-md bg-soft-dark p-5 backdrop:bg-black backdrop:opacity-50
      md:max-h-[600px] md:max-w-[300px] lg:max-w-[800px] ${styles.infoModal}`}
      ref={modalReference}
      onClick={event => {
        closeModalFromOutside(event.clientX, event.clientY)
      }}
    >
      <button
        className="absolute rounded-full bg-dark p-2"
        aria-label="Fechar modal de informações"
        onClick={closeModal}
      >
        <AiOutlineClose className="text-white" />
      </button>

      <div className="flex flex-col space-y-5 lg:flex-row lg:space-x-5 lg:space-y-0">
        <section>
          <h2 className="mb-5 text-center text-lg font-bold text-white">
            Regras
          </h2>
          <ul className="ml-5 list-disc text-soft-gray">{renderRules()}</ul>
        </section>
        <div className="border-[1px] border-soft-gray" />
        <section>
          <h2 className="mb-5 text-center text-lg font-bold text-white">
            Informações
          </h2>
          <ul className="ml-5 list-disc text-soft-gray">
            {renderInformation()}
          </ul>
        </section>
      </div>
    </dialog>
  )
}

export default InfoModal
