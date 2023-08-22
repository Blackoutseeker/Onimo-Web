import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' })
  }

  const allowedDomains: string[] = [
    'http://localhost:3000/',
    process.env.PRODUCTION_REFERER
  ]
  const requestDomain = request.headers.referer

  if (
    requestDomain === undefined ||
    (typeof requestDomain === 'string' &&
      !allowedDomains.includes(requestDomain))
  ) {
    return response.status(403).json({ error: 'Unauthorized access' })
  }

  const { senderId, senderNickname, sendTimestamp, bodyText, roomId } =
    request.body

  const message = {
    senderId,
    senderNickname,
    sendTimestamp,
    bodyText
  }

  const messageBearerKey =
    process.env.TEST_MESSAGE_BEARER_KEY ?? process.env.MESSAGE_BEARER_KEY
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${messageBearerKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...message, roomId })
  }

  try {
    await fetch(`${requestDomain}api/message`, requestOptions).then(
      async fetchResponse => {
        const responseData = await fetchResponse.json()
        return response.status(fetchResponse.status).json(responseData)
      }
    )
  } catch (error) {
    return response.status(500).json({ message: error })
  }
}

export default handler
