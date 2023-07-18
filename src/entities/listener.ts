import type { Unsubscribe } from 'firebase/database'

export interface Listener {
  on: () => Unsubscribe
  off: () => void
}
