import type { User } from '@/entities/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  nickname: 'john_doe7'
} as User

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id
      state.nickname = action.payload.nickname
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
