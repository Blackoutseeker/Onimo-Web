import type { Dispatch, SetStateAction } from 'react'
import type { Message } from '@/entities/message'
import type { Listener } from '@/entities/listener'
import { query, ref, limitToLast, onValue, off, set } from 'firebase/database'
import { firebaseDatabase } from '@/utils/firebase'

export const listenMessages = (
  roomId: string,
  setMessages: Dispatch<SetStateAction<Message[]>>
): Listener => {
  const messagesQuery = query(
    ref(firebaseDatabase, `chat_rooms/${roomId}/chat`),
    limitToLast(10)
  )

  return {
    on: () =>
      onValue(messagesQuery, snapshot => {
        const messages: Message[] = []
        snapshot.forEach(message => {
          messages.push(message.val() as Message)
        })
        setMessages(messages)
      }),
    off: () => off(messagesQuery)
  }
}

export const setMessage = async (roomId: string, message: Message) => {
  const messageReference = ref(
    firebaseDatabase,
    `chat_rooms/${roomId}/chat/${message.send_timestamp}`
  )
  await set(messageReference, message)
}
