import { FC, memo } from 'react'
import type { Message } from '@/entities/message'
import { formatTime } from '@/utils/format'

interface MessageCardProps {
  message: Message
}

const MessageCard: FC<MessageCardProps> = ({ message }) => {
  const formattedTime = formatTime(message.send_timestamp)
  const isMessageFromCurrentUser = message.sender_id === 'user_id_example'

  if (isMessageFromCurrentUser) {
    return (
      <li className="flex justify-end">
        <div
          className="ml-20 flex w-fit min-w-[340px] flex-col space-y-[14px] rounded-lg
          rounded-tr-none bg-soft-dark p-[14px] text-sm text-white"
        >
          <p>{message.body_text}</p>
          <p className="text-end">{formattedTime}</p>
        </div>
      </li>
    )
  }

  return (
    <li
      className="mr-20 flex w-fit min-w-[340px] flex-col space-y-[14px] rounded-lg
      rounded-tl-none border-2 border-soft-dark p-[14px] text-sm text-soft-gray"
    >
      <h2 className="text-base font-bold text-white">
        {message.sender_nickname}
      </h2>
      <p>{message.body_text}</p>
      <p className="text-end">{formattedTime}</p>
    </li>
  )
}

export default memo(MessageCard)
