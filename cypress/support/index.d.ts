declare namespace Cypress {
  interface Chainable {
    signup(email: string, password: string): Cypress.Chainable<Cypress.Response>
    signupAndLogin(email: string, password: string): Cypress.Chainable<Cypress.Response>
  }
}
