import styles from './styles.module.css'
import { FC, useState, useRef, useEffect } from 'react'
import { useAppSelector } from '@/hooks/redux'
import type { Message } from '@/entities/message'
import { listenMessages } from '@/services/database/message'
import VoidChat from '../VoidChat'
import MessageCard from '../MessageCard'

const Chat: FC = () => {
  const currentRoom = useAppSelector(state => state.room)
  const [messages, setMessages] = useState<Message[]>([])
  const chatListRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const handleMessagesListener = listenMessages(currentRoom.id, setMessages)
    handleMessagesListener.on()
    return () => {
      handleMessagesListener.off()
    }
  }, [currentRoom.id])

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight
    }
  }, [chatListRef, messages])

  const messagesSortedByMostRecent = messages.sort((a, b) => {
    const aDate = new Date(a.send_timestamp).getTime()
    const bDate = new Date(b.send_timestamp).getTime()
    return aDate - bDate
  })

  const renderMessages = () =>
    messagesSortedByMostRecent.map(message => (
      <MessageCard key={message.send_timestamp} message={message} />
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
