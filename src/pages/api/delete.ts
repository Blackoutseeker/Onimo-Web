import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteRooms } from '@/services/database/admin'

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'GET') {
    return response.status(405).json({ message: 'Method not allowed' })
  }

  const cronSecret = process.env.CRON_SECRET_TEST ?? process.env.CRON_SECRET
  if (request.headers.authorization === `Bearer ${cronSecret}`) {
    const isTesting: boolean =
      process.env.IS_TESTING_FROM_CI || !!process.env.CRON_SECRET_TEST?.length

    if (isTesting) {
      return response
        .status(200)
        .json({ message: 'TEST: data deleted successfully' })
    }

    await deleteRooms()
    return response.status(200).send('OK')
  }

  return response.status(401).json({ message: 'Unauthorized access' })
}

export default handler
