import { firebaseAdminDatabase } from '@/utils/firebaseAdmin'

export const deleteRooms = async () => {
  await firebaseAdminDatabase.ref('available_rooms').remove()
  await firebaseAdminDatabase.ref('chat_rooms').remove()
}
