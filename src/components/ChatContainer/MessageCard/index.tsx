import { FC, memo } from 'react'
import type { Message } from '@/entities/message'
import { formatTime } from '@/utils/format'

interface MessageCardProps {
  message: Message
  isMessageFromCurrentUser: boolean
}

const MessageCard: FC<MessageCardProps> = ({
  message,
  isMessageFromCurrentUser
}) => {
  const formattedTime = formatTime(message.send_timestamp)

  return (
    <li className={`flex ${isMessageFromCurrentUser ? 'justify-end' : ''}`}>
      <div
        className={`${isMessageFromCurrentUser ? 'ml-10' : 'mr-10'}
        ${isMessageFromCurrentUser ? 'md:ml-20' : 'md:mr-20'}
        ${isMessageFromCurrentUser && 'bg-soft-dark text-white'}
        ${isMessageFromCurrentUser ? 'rounded-tr-none' : 'rounded-tl-none'}
        flex w-fit min-w-[180px] flex-col space-y-[14px] rounded-lg border-2
        border-soft-dark p-[14px] text-sm text-soft-gray md:min-w-[340px]`}
      >
        {!isMessageFromCurrentUser && (
          <h2 className="text-base font-bold text-white">
            {message.sender_nickname}
          </h2>
        )}
        <p>{message.body_text}</p>
        <p className="text-end">{formattedTime}</p>
      </div>
    </li>
  )
}

export default memo(MessageCard)
