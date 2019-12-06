import { generateStringOfLength } from '../support/utils/generate';

describe('Lists', () => {
  const email = `${generateStringOfLength(10)}@crounch.me`;
  const password = 'pass word';

  it('Should logout user.', () => {
    cy.signupAndLogin(email, password);

    cy.visit('/');

    cy
      .get('#logout')
      .click();

    cy.contains('h1', 'Do you want to Crounch ?')
  });
});
