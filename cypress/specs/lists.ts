import { generateStringOfLength, waitForElement } from '../support/utils/generate';

describe('Lists', () => {
  let email: string;
  let password: string;
  beforeEach(() => {
    email = `${generateStringOfLength(10)}@crounch.me`;
    password = 'pass word';

    cy.signupAndLogin(email, password);
  });

  it('Should create a new list and display it.', () => {
    const name = 'Nouvelle liste'
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
      .contains(name);
  });

  it('Should get all users lists.', () => {
    const name = 'Liste Maison';
    cy.createList(name);

    cy.visit('/lists');

    cy.contains(name);
  });

  it('Should see of the the users lists.', () => {
    const name = 'List Maison';

    cy.createList(name);

    cy.visit('/lists')
    waitForElement(cy, '.list')

    cy.get('.list').click()

    waitForElement(cy, '#list')

    cy.contains(name)
  })

  it('Should delete a list.', () => {
    const name = 'List Maison'

    cy.createList(name)

    cy.visit('/lists')
    waitForElement(cy, '.list')

    cy.get('.list:first-child a').click()

    cy.get('body').find('.list').should('have.length', 0)
  })
});
