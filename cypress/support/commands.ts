export function signup(email: string, password: string): Cypress.Chainable<Cypress.Response> {
  return cy.request('POST', 'http://localhost:3000/users', {
    email,
    password
  });
};

Cypress.Commands.add('signup', signup);
