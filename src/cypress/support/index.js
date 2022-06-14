Cypress.Commands.add('getByTestId', (id) => cy.get(`[data-cy="${id}"]`))

Cypress.Commands.add('verifyCallCount', (alias, expectedNumberOfCalls) => {
  cy.wait(alias)
  cy.get(`${alias}.all`).should('have.length', expectedNumberOfCalls)
})

Cypress.Commands.add('matchUrl', (url) => {
  const baseUrl = Cypress.config().baseUrl
  const route = `${baseUrl}${url}`
  cy.url().should('eq', route)
})
