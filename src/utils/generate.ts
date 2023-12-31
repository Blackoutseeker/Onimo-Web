import { nicknames } from './constants'
import type { User } from '@/entities/user'

const chars = Array.from(Array(26), (_, i) => String.fromCharCode(65 + i))
  .concat(Array.from(Array(26), (_, i) => String.fromCharCode(97 + i)))
  .concat(Array.from(Array(10), (_, i) => String.fromCharCode(48 + i)))

export const generateId = (length: number = 12): string => {
  let id: string = ''

  for (let index = 0; index < length; index++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    const randomChar = chars[randomIndex]
    id += randomChar
  }

  return id
}

export const generateNickname = (): string => {
  const randomIndex = Math.floor(Math.random() * nicknames.length)
  let randomNickname: string = nicknames[randomIndex]
  const randomDigit = Math.floor(Math.random() * 9) + 1
  randomNickname += randomDigit
  return randomNickname
}

export const generateUser = (): User => {
  return {
    id: generateId(),
    nickname: generateNickname()
  }
}

export const generateExpirationDate = (): Date => {
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 1)
  expirationDate.setHours(0, 0, 0, 0)
  return expirationDate
}
