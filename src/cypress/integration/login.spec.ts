import { faker } from '@faker-js/faker'
import { mockLogin, mockLoginError } from '../support/mocks/login'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should load with correct initial state', () => {
    cy.getByTestId('login_email_input').should('be.empty')
    cy.getByTestId('login_password_input').should('be.empty')
    cy.getByTestId('login_submit_button').should('have.attr', 'disabled')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('login_email_input').focus().type(faker.internet.email())
    cy.getByTestId('login_password_input')
      .focus()
      .type(faker.internet.password())
    cy.getByTestId('login_submit_button').should('not.have.attr', 'disabled')
  })

  it('should not call submit if form is invalid', () => {
    mockLogin()

    cy.getByTestId('login_email_input')
      .focus()
      .type(faker.internet.email())
      .type('{enter}')

    cy.verifyCallCount('@request', 0)
  })

  it('should prevent multiple submits', () => {
    mockLogin()
    cy.getByTestId('login_email_input').focus().type(faker.internet.email())
    cy.getByTestId('login_password_input')
      .focus()
      .type(faker.internet.password())
    cy.getByTestId('login_submit_button').dblclick()

    cy.verifyCallCount('@request', 1)
  })

  it('should present snackbar on 400', () => {
    mockLoginError()
    cy.getByTestId('login_email_input').focus().type(faker.internet.email())
    cy.getByTestId('login_password_input')
      .focus()
      .type(faker.internet.password())
    cy.getByTestId('login_submit_button').click()

    cy.matchUrl('login')
  })

  it('should redirect on 201', () => {
    mockLogin()

    cy.getByTestId('login_email_input').focus().type(faker.internet.email())
    cy.getByTestId('login_password_input')
      .focus()
      .type(faker.internet.password())
    cy.getByTestId('login_submit_button').click()

    cy.matchUrl('portal/home')
  })
})
