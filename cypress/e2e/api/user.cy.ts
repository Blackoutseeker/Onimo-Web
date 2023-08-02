import { idRegex, generatedNicknameRegex } from '@/utils/constants'
const endpoint = '/api/user'

describe('Testing "user" API endpoint', () => {
  it('Response status must be 200', () => {
    cy.request('GET', endpoint).then(response => {
      expect(response.status).to.equal(200)
    })
  })

  it('Response body must return "User" type as keys', () => {
    cy.request('GET', endpoint).then(response => {
      expect(response.body).to.have.key('user')
      expect(response.body.user).to.have.keys('id', 'nickname')
    })
  })

  it('Keys must respect their regex', () => {
    cy.request('GET', endpoint).then(response => {
      expect(response.body.user.id).to.match(idRegex)
      expect(response.body.user.nickname).to.match(generatedNicknameRegex)
    })
  })
})
