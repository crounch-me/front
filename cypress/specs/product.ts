import { generateStringOfLength, waitForElement } from '../support/utils/generate';

describe('Lists', () => {
  let email: string;
  let password: string;
  beforeEach(() => {
    email = `${generateStringOfLength(10)}@crounch.me`;
    password = 'pass word';

    cy.signupAndLogin(email, password);
  });

  it('Should search for a base product.', () => {
    const listName = 'List Maison'

    cy.createList(listName)

    const name = 'Sau'
    cy.visit('/lists')

    waitForElement(cy, '.list')

    cy.get('.list span').click()

    cy.get('#product-search').type(name)

    cy.get('body').find('.product').its('length').should('be.gte', 2)
  });
});
