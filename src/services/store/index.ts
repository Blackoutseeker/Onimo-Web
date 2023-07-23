import { combineReducers, configureStore } from '@reduxjs/toolkit'
import roomReducer from './ducks/room'
import userReducer from './ducks/user'

const rootReducer = combineReducers({
  room: roomReducer,
  user: userReducer
})

export const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
