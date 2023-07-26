import { ref, onDisconnect } from 'firebase/database'
import { firebaseDatabase } from '@/utils/firebase'

export const handleUserDisconnect = (
  roomId: string,
  isPrivateRoom: boolean = false,
  userId: string
) => {
  let userReference = ref(
    firebaseDatabase,
    `available_rooms/${roomId}/active_users/${userId}`
  )

  if (isPrivateRoom) {
    userReference = ref(
      firebaseDatabase,
      `chat_rooms/${roomId}/active_users/${userId}`
    )
  }

  onDisconnect(userReference).remove()
}
