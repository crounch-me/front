import { generateStringOfLength } from '../../support/utils/generate';

describe('Logout', () => {
  const email = `${generateStringOfLength(10)}@crounch.me`;
  const password = 'pass word';

  it('Should logout user.', () => {
    cy.signupAndLogin(email, password);

    cy.visit('/');

    cy
      .get('#logout')
      .click();

    cy.contains('h1', 'Voulez-vous crouncher avec moi ce soir ?')
  });
});
