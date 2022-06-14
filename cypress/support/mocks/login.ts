import { token } from './token'

export const mockLogin = (): void => {
  cy.intercept('POST', 'admin/auth/login', {
    statusCode: 201,
    fixture: 'custodian-bank'
  }).as('request')
}

export const mockLoginError = (): void => {
  cy.intercept('POST', 'admin/auth/login', {
    statusCode: 400,
    body: {
      name: 'any_error'
    }
  }).as('request')
}

export const mockRefreshToken = (): void => {
  cy.intercept('POST', 'admin/auth/refresh', {
    statusCode: 201,
    body: token
  }).as('token')
}
