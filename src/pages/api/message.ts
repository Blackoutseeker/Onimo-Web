import type { NextApiRequest, NextApiResponse } from 'next'
import { badWordsFilter } from '@/utils/constants'
import type { Message } from '@/entities/message'
import { setMessage } from '@/services/database/admin'

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' })
  }

  const messageBearerKey =
    process.env.TEST_MESSAGE_BEARER_KEY ?? process.env.MESSAGE_BEARER_KEY
  if (request.headers.authorization !== `Bearer ${messageBearerKey}`) {
    return response.status(403).json({ message: 'Unauthorized access' })
  }

  const { senderId, senderNickname, sendTimestamp, bodyText, roomId } =
    request.body

  const isBodyValid: boolean =
    typeof senderId === 'string' &&
    typeof senderNickname === 'string' &&
    typeof sendTimestamp === 'string' &&
    typeof bodyText === 'string' &&
    typeof roomId === 'string' &&
    bodyText.length > 0

  if (isBodyValid) {
    const cleanedText = badWordsFilter.clean(bodyText)
    const message: Message = {
      sender_id: senderId,
      sender_nickname: senderNickname,
      send_timestamp: sendTimestamp,
      body_text: cleanedText
    }
    await setMessage(roomId, message)
    return response.status(200).json({ message: 'OK' })
  }

  return response.status(400).json({ message: 'Missing queries' })
}

export default handler
