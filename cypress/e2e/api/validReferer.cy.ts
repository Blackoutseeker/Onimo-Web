import { generateUser, generateId } from '@/utils/generate'
import { formatSendTimestamp } from '@/utils/format'
import { faker } from '@faker-js/faker'

const endpoint = '/api/valid-referer'
const fakeUser = generateUser()

describe('Testing "valid-referer" API endpoint', () => {
  it('Response status must be 200', () => {
    const message = {
      senderId: fakeUser.id,
      senderNickname: fakeUser.nickname,
      sendTimestamp: formatSendTimestamp(new Date()),
      bodyText: faker.hacker.phrase()
    }
    const roomId = generateId(4)

    cy.request({
      method: 'POST',
      url: endpoint,
      body: JSON.stringify({ ...message, roomId }),
      headers: {
        referer: 'http://localhost:3000/',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      expect(response.status).to.equal(200)
      expect(response.body.message).to.equal('OK')
    })
  })
})
