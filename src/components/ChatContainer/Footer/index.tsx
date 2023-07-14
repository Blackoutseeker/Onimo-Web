import { FC, useState, ChangeEvent, FormEvent } from 'react'
import { MdSend } from 'react-icons/md'

const Footer: FC = () => {
  const [message, setMessage] = useState<string>('')

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const submitMessage = async (event: FormEvent) => {
    event.preventDefault()
  }

  return (
    <footer>
      <form
        className="flex items-center space-x-5 px-10"
        onSubmit={submitMessage}
      >
        <input
          className="w-full rounded-full bg-soft-dark px-[30px] py-[14px] text-white
        placeholder:text-soft-gray"
          value={message}
          onChange={handleMessageChange}
          placeholder="Mensagem"
          maxLength={300}
        />
        {message.length > 0 && (
          <p className="text-sm text-white">{message.length}/300</p>
        )}
        <button
          className="rounded-full bg-accent p-4 duration-150 disabled:bg-transparent"
          type="submit"
          title="Enviar mensagem"
          aria-label="Enviar mensagem"
          disabled={message.length === 0}
        >
          <MdSend className="text-white" size={20} />
        </button>
      </form>
    </footer>
  )
}

export default Footer
