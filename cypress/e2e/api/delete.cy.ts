const endpoint = '/api/delete'

describe('Testing "delete" API endpoint', () => {
  it('Response status must be 200', () => {
    cy.request({
      method: 'GET',
      url: endpoint,
      headers: { Authorization: `Bearer ${Cypress.env('CRON_SECRET_TEST')}` }
    }).then(response => {
      expect(response.status).to.equal(200)
      expect(response.body.message).to.equal('TEST: data deleted successfully')
    })
  })
})
