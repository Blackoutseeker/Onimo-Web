import type { Room, ActiveUser } from '@/entities/room'
import type { Listener } from '@/entities/listener'
import { firebaseDatabase } from '@/utils/firebase'
import { ref, onValue, off, get, set, remove } from 'firebase/database'
import { generateId } from '@/utils/generate'

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
  setUserCounter: (userCounter: number) => void,
  isPrivateRoom: boolean = false
): Listener => {
  let roomReference = ref(firebaseDatabase, `available_rooms/${roomId}`)
  if (isPrivateRoom) {
    roomReference = ref(firebaseDatabase, `chat_rooms/${roomId}`)
  }

  return {
    on: () =>
      onValue(roomReference, snapshot => {
        let activeUsers: number = 0

        if (snapshot.hasChild('active_users')) {
          snapshot.child('active_users').forEach(() => {
            activeUsers += 1
          })
        }
        setUserCounter(activeUsers)
      }),
    off: () => off(roomReference)
  }
}

const getPublicRoomsLength = async (): Promise<number> => {
  let roomsLength = 0
  const availableRoomsReference = ref(firebaseDatabase, 'available_rooms')
  await get(availableRoomsReference).then(snapshot => {
    if (snapshot.hasChildren()) {
      snapshot.forEach(() => {
        roomsLength += 1
      })
    }
  })
  return roomsLength
}

export const setPublicRoom = async (): Promise<Room | undefined> => {
  const publicRoomsLength = await getPublicRoomsLength()
  if (publicRoomsLength < 10) {
    const publicRoom: Room = {
      id: generateId(),
      name: `Sala ${publicRoomsLength + 1}`
    }
    const roomReference = ref(
      firebaseDatabase,
      `available_rooms/${publicRoom.id}`
    )
    await set(roomReference, publicRoom)
    return publicRoom
  }
  return undefined
}

export const getActiveUsers = async (
  roomId: string,
  isPrivateRoom: boolean = false
): Promise<number> => {
  let activeUsers = 0
  let roomReference = ref(firebaseDatabase, `available_rooms/${roomId}`)

  if (isPrivateRoom) {
    roomReference = ref(firebaseDatabase, `chat_rooms/${roomId}`)
  }

  await get(roomReference).then(snapshot => {
    if (snapshot.hasChild('active_users')) {
      snapshot.child('active_users').forEach(() => {
        activeUsers += 1
      })
    }
  })

  return activeUsers
}

const addUserInRoom = async (
  roomId: string,
  userId: string,
  isPrivateRoom: boolean = false
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
  await set(userReference, { status: 'connected' })
}

const removeUserFromRoom = async (
  roomId: string,
  userId: string,
  isPrivateRoom: boolean = false
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
  await remove(userReference)
}

export const handleRoomChange = async (
  oldRoom: Room,
  newRoom: Room,
  userId: string,
  isPrivateRoom: boolean = false
) => {
  if (oldRoom.id !== '') {
    const isPrivateRoom = oldRoom.id === oldRoom.name
    await removeUserFromRoom(oldRoom.id, userId, isPrivateRoom)
  }
  await addUserInRoom(newRoom.id, userId, isPrivateRoom)
}

export const setPrivateRoom = async (userId: string): Promise<Room> => {
  const roomId = generateId(4).toUpperCase()
  const privateRoom: Room = {
    id: roomId,
    name: roomId
  }
  await addUserInRoom(roomId, userId, true)
  return privateRoom
}

export const checkIfPrivateRoomExists = async (
  roomId: string
): Promise<boolean> => {
  const privateRoomReference = ref(firebaseDatabase, `chat_rooms/${roomId}`)
  return (await get(privateRoomReference)).exists()
}
