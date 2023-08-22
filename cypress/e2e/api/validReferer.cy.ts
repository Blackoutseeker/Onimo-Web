import { generateUser, generateId } from '@/utils/generate'
import { formatSendTimestamp } from '@/utils/format'
import { faker } from '@faker-js/faker'
import { httpMethods } from '@/utils/constants'

const endpoint = '/api/valid-referer'
const fakeUser = generateUser()

describe('Testing "valid-referer" API endpoint', () => {
  it('Response status must be 200 if everything is correct', () => {
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

  it('Response status must be 405 for methods other than "POST"', () => {
    const disallowedMethods = httpMethods.filter(method => method !== 'POST')

    for (const method of disallowedMethods) {
      cy.request({
        method,
        url: endpoint,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.equal(405)
        expect(response.body.message).to.equal('Method not allowed')
      })
    }
  })
})
