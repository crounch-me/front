import { generateStringOfLength } from 'cypress/support/utils/generate';

describe('Login', () => {
  const email = `${generateStringOfLength(10)}@crounch.me`;
  const password = 'pass word';

  before(() => {
    cy.signup(email, password);
  });

  it('Should login successfully.', () => {
    cy.visit('/');

    cy
      .get('#login')
      .find('input[type=text]')
      .type(email);

    cy
      .get('#login')
      .find('input[type=password]')
      .type(password);

    cy
      .get('#login')
      .find('input[type=submit]')
      .trigger('click');

    cy
      .contains('Connected');
  });
});
