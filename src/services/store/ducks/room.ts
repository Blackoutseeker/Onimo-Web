import type { Room } from '@/entities/room'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  name: ''
} as Room

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setCurrentRoom: (state, action: PayloadAction<Room>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.active_users = action.payload.active_users
    }
  }
})

export const { setCurrentRoom } = roomSlice.actions
export default roomSlice.reducer
