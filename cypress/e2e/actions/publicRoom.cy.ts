describe('Testing public room actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Must create a new public room', () => {
    cy.getElementByDataCy('rooms-list').then(element => {
      const elementsLength = Cypress.$(element).children().length
      if (elementsLength < 10) {
        cy.getElementByDataCy('crate-public-room-button').click()
        cy.getElementByDataCy(`public-room-${elementsLength + 1}`).should(
          'exist'
        )
      }
    })
  })
})
