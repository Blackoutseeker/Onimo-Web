describe('Testing "user" API endpoint', () => {
  it('Response status must be 200', () => {
    cy.request('GET', '/api/user').then(response => {
      expect(response.status).to.equal(200)
    })
  })
})
