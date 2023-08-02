import { FC, useState, ChangeEvent, FormEvent } from 'react'
import { useAppSelector } from '@/hooks/redux'
import type { Message } from '@/entities/message'
import { formatSendTimestamp } from '@/utils/format'
import { setMessage } from '@/services/database/message'
import { MdSend } from 'react-icons/md'

const Footer: FC = () => {
  const room = useAppSelector(state => state.room)
  const user = useAppSelector(state => state.user)
  const [messageBody, setMessageBody] = useState<string>('')

  const handleMessageBodyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageBody(event.target.value)
  }

  const roomIdIsEmpty = room.id === ''

  const submitMessage = async (event: FormEvent) => {
    event.preventDefault()
    if (roomIdIsEmpty) {
      const message: Message = {
        sender_id: user.id,
        sender_nickname: user.nickname,
        send_timestamp: formatSendTimestamp(new Date()),
        body_text: messageBody
      }
      await setMessage(room.id, message)
    }
    setMessageBody('')
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
          value={messageBody}
          onChange={handleMessageBodyChange}
          placeholder="Mensagem"
          maxLength={300}
          disabled={roomIdIsEmpty}
        />
        {messageBody.length > 0 && (
          <p className="text-sm text-white">{messageBody.length}/300</p>
        )}
        <button
          className="rounded-full bg-accent p-4 duration-150 disabled:bg-transparent"
          type="submit"
          title="Enviar mensagem"
          aria-label="Enviar mensagem"
          disabled={messageBody.length === 0}
        >
          <MdSend className="text-white" size={20} />
        </button>
      </form>
    </footer>
  )
}

export default Footer
