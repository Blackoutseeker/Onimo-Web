import { FC, memo } from 'react'
import type { Message } from '@/entities/message'
import { formatTime } from '@/utils/format'

interface MessageCardProps {
  message: Message
}

const MessageCard: FC<MessageCardProps> = ({ message }) => {
  const formattedTime = formatTime(message.sendTimestamp)
  const isMessageFromCurrentUser = message.senderId === 'user_id_example'

  if (isMessageFromCurrentUser) {
    return (
      <li className="flex justify-end">
        <div
          className="ml-20 flex w-fit min-w-[340px] flex-col space-y-[14px] rounded-lg
          rounded-tr-none bg-soft-dark p-[14px] text-sm text-white"
        >
          <p>{message.bodyText}</p>
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
        {message.senderNickname}
      </h2>
      <p>{message.bodyText}</p>
      <p className="text-end">{formattedTime}</p>
    </li>
  )
}

export default memo(MessageCard)
