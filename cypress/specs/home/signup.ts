import { generateStringOfLength } from '../../support/utils/generate';

describe('Signup', () => {
  it('Should signup successfully and call login just after.', () => {
    cy.visit('/');

    cy
      .get('#signup')
      .find('input[type=text]')
      .type(`${generateStringOfLength(10)}@crounch.me`);

    cy
      .get('#signup')
      .find('input[type=password]')
      .type('password');

    cy
      .get('#signup')
      .find('form')
      .submit();

    cy
      .contains('Connecté');
  });
});
