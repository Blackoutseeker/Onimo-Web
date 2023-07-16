import styles from './styles.module.css'
import { FC, useState, useRef, useEffect } from 'react'
import type { Message } from '@/entities/message'
import VoidChat from '../VoidChat'
import MessageCard from '../MessageCard'

const Chat: FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const chatListRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight
    }
  }, [chatListRef])

  const messagesSortedByMostRecent = messages.sort((a, b) => {
    const aDate = new Date(a.sendTimestamp).getTime()
    const bDate = new Date(b.sendTimestamp).getTime()
    return aDate - bDate
  })

  const renderMessages = () =>
    messagesSortedByMostRecent.map(message => (
      <MessageCard key={message.sendTimestamp} message={message} />
    ))

  if (messages.length === 0) return <VoidChat />

  return (
    <ol
      id="chat-list"
      className={`flex max-h-[calc(100dvh-284px)] flex-grow flex-col
      space-y-5 overflow-y-auto scroll-smooth px-10 ${styles.chatList}`}
      ref={chatListRef}
    >
      {renderMessages()}
    </ol>
  )
}

export default Chat
