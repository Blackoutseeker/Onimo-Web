import { faker } from '@faker-js/faker'

describe('Testing message sending', () => {
  it('Must send a message', () => {
    cy.visit('/')
    cy.intercept('/api/user').as('getUser')
    cy.wait('@getUser')

    cy.getElementByDataCy('create-public-room-button').click()
    cy.getElementByDataCy('rooms-list').then(element => {
      const elementsLength = Cypress.$(element).children().length
      const randomRoom = Math.floor(Math.random() * elementsLength) + 1
      const room = `Sala ${randomRoom}`
      const message = faker.hacker.phrase()

      cy.get('li').contains(room).click()
      cy.getElementByDataCy('message-input').type(`${message}{enter}`)
      cy.get('li').contains(message).should('be.visible')
    })
  })
})
