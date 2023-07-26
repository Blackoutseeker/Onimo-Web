import type { Room, ActiveUser } from '@/entities/room'
import type { Listener } from '@/entities/listener'
import { firebaseDatabase } from '@/utils/firebase'
import { ref, onValue, off } from 'firebase/database'

export const listenRooms = (setRooms: (rooms: Room[]) => void): Listener => {
  const roomsReference = ref(firebaseDatabase, 'available_rooms')

  return {
    on: () =>
      onValue(roomsReference, snapshot => {
        const rooms: Room[] = []

        snapshot.forEach(room => {
          const currentRoom = room.val() as Room

          if (room.hasChild('active_users')) {
            currentRoom.active_users = []
            room.child('active_users').forEach(user => {
              const activeUser: ActiveUser = {
                id: user.key,
                status: user.val().status
              }
              currentRoom.active_users?.push(activeUser)
            })
          }

          rooms.push(currentRoom)
        })
        setRooms(rooms)
      }),
    off: () => off(roomsReference)
  }
}

export const listenActiveUsers = (
  roomId: string,
  setUserCounter: (userCounter: number) => void
): Listener => {
  const roomsReference = ref(firebaseDatabase, `available_rooms/${roomId}`)

  return {
    on: () =>
      onValue(roomsReference, snapshot => {
        let activeUsers: number = 0

        if (snapshot.hasChild('active_users')) {
          snapshot.child('active_users').forEach(() => {
            activeUsers += 1
          })
        }
        setUserCounter(activeUsers)
      }),
    off: () => off(roomsReference)
  }
}
