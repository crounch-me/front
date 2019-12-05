import { generateStringOfLength } from '../../support/utils/generate';

describe('Home', () => {
  it('Should display the home title.', () => {
    cy.visit('/')
    cy.contains('h1', 'Do you want to Crounch ?')
  });

  it('Should redirect to lists page when user is authenticated.', () => {
    const email = `${generateStringOfLength(10)}@crounch.me`;
    const password = 'pass word';

    cy
      .signupAndLogin(email, password);

    cy.visit('/');

    cy.contains('Listes');
  });
});
