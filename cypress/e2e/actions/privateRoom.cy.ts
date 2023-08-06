import { idRegex } from '@/utils/constants'

describe('Testing private room actions', () => {
  it('Must create a new private room', () => {
    cy.visit('/')
    cy.intercept('/api/user').as('getUser')
    cy.wait('@getUser')

    cy.getElementByDataCy('create-private-room-button').click()
    cy.getElementByDataCy('room-input').invoke('val').should('have.length', 4)
    cy.getElementByDataCy('room-input').invoke('val').should('match', idRegex)
  })
})
