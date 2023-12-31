import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserFromToken } from '@/services/auth/token'

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'GET') {
    return response.status(405).json({ message: 'Method not allowed' })
  }

  const token = request.cookies.token
  if (!token) {
    return response.status(401).json({ message: 'Token not found.' })
  }

  const user = await getUserFromToken(token)
  return response.status(200).json({ user })
}

export default handler
