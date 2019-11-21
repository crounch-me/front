// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Should visit the home page', () => {
    cy.visit('/')
    cy.contains('h1', 'Do you want to Crounch ?')
  });
});
