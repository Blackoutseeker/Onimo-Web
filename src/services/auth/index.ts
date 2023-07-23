import { SignJWT } from 'jose'
import {
  generateUser,
  generateExpirationDate,
  generateId
} from '@/utils/generate'

export const secretKey = process.env.JWT_SECRET_KEY

export const generateToken = async (): Promise<string> => {
  const user = generateUser()
  const expirationTime = generateExpirationDate().getTime() / 1000

  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(generateId(40))
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(new TextEncoder().encode(secretKey))

  return token
}
