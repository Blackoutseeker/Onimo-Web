import { SignJWT, jwtVerify } from 'jose'
import {
  generateUser,
  generateExpirationDate,
  generateId
} from '@/utils/generate'
import type { User } from '@/entities/user'

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

export const getUserFromToken = async (token: string): Promise<User> => {
  try {
    const verifiedToken = await jwtVerify(
      token,
      new TextEncoder().encode(secretKey)
    )

    return verifiedToken.payload.user as User
  } catch (error) {
    throw new Error(`${error}`)
  }
}
