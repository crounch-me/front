import { generateStringOfLength } from '../../support/utils/generate';

describe('Lists', () => {
  let email: string;
  let password: string;
  const name = 'Nouvelle liste'
  beforeEach(() => {
    email = `${generateStringOfLength(10)}@crounch.me`;
    password = 'pass word';

    cy
      .signupAndLogin(email, password);
  });

  it('Should create a new list.', () => {
    cy.visit('/');

    cy
      .get('#create-list')
      .find('input[type=text]')
      .type(name);

    cy
      .get('#create-list')
      .find('form')
      .submit();

    cy
      .contains('Créée');
  });
});
