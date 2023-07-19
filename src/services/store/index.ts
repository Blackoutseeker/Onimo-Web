import { combineReducers, configureStore } from '@reduxjs/toolkit'
import roomReducer from './ducks/room'

const rootReducer = combineReducers({
  room: roomReducer
})

export const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
