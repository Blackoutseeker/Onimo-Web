import { firebaseAdminDatabase } from '@/utils/firebaseAdmin'
import type { Message } from '@/entities/message'

export const deleteRooms = async () => {
  await firebaseAdminDatabase.ref('available_rooms').remove()
  await firebaseAdminDatabase.ref('chat_rooms').remove()
}

export const setMessage = async (roomId: string, message: Message) => {
  await firebaseAdminDatabase
    .ref(`chat_rooms/${roomId}/chat/${message.send_timestamp}`)
    .set(message)
}
