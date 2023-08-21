import { generateUser, generateId } from '@/utils/generate'
import { formatSendTimestamp } from '@/utils/format'
import { faker } from '@faker-js/faker'

const endpoint = '/api/message'
const fakeUser = generateUser()

describe('Testing "message" API endpoint', () => {
  const messageBearerKey = Cypress.env('TEST_MESSAGE_BEARER_KEY')

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
        Authorization: `Bearer ${messageBearerKey}`,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      expect(response.status).to.equal(200)
      expect(response.body.message).to.equal('OK')
    })
  })

  it('Response status must be 405 for methods other than "POST"', () => {
    const disallowedMethods = ['GET', 'PUT', 'PATCH', 'DELETE']

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

  it('Response status must be 403 if not authorized', () => {
    cy.request({
      method: 'POST',
      url: endpoint,
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(403)
      expect(response.body.message).to.equal('Unauthorized access')
    })
  })

  it('Response status must be 400 if there are missing queries', () => {
    cy.request({
      method: 'POST',
      url: endpoint,
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${messageBearerKey}`
      }
    }).then(response => {
      expect(response.status).to.equal(400)
      expect(response.body.message).to.equal('Missing queries')
    })
  })
})
