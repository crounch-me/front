import { generateStringOfLength } from '../../support/utils/generate';

describe('Signup', () => {
  it('Should not signup successfully when user is already registered with the email.', () => {
    const email = `${generateStringOfLength(10)}@crounch.me`;
    const password = 'pass word';

    cy.signup(email, password);

    cy.visit('/')

    cy
      .get('#signup')
      .find('input[type=text]')
      .type(email);

    cy
      .get('#signup')
      .find('input[type=password]')
      .type(password);

    cy
      .get('#signup')
      .find('form')
      .submit();

    cy
      .contains('Cet email est invalide ou déjà pris.')
  });

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
      .contains('Listes');
  });
});
