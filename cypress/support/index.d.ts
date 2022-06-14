declare namespace Cypress {
  interface Chainable {
    getByTestId: (id: string) => Chainable<Element>
    matchUrl: (url: string) => Chainable<Element>
    verifyCallCount: (alias: string, expectedNumberOfCalls: number) => Chainable<Element>
  }
}
