import { httpMethods } from '@/utils/constants'
const endpoint = '/api/delete'

describe('Testing "delete" API endpoint', () => {
  it('Response status must be 200 if everything is correct', () => {
    cy.request({
      method: 'GET',
      url: endpoint,
      headers: { Authorization: `Bearer ${Cypress.env('CRON_SECRET_TEST')}` }
    }).then(response => {
      expect(response.status).to.equal(200)
      expect(response.body.message).to.equal('TEST: data deleted successfully')
    })
  })

  it('Response status must be 405 for methods other than "GET"', () => {
    const disallowedMethods = httpMethods.filter(method => method !== 'GET')

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

  it('Response status must be 401 if not authorized', () => {
    cy.request({
      method: 'GET',
      url: endpoint,
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(401)
      expect(response.body.message).to.equal('Unauthorized access')
    })
  })
})
