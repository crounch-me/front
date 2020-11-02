import { generateStringOfLength, waitForElement } from '../support/utils/generate';

describe('Lists', () => {
  let email: string;
  let password: string;
  const name = 'List Maison';

  beforeEach(() => {
    email = `${generateStringOfLength(10)}@crounch.me`;
    password = 'pass word';

    cy.signupAndLogin(email, password);
  });

  it('Should create a new list and display it.', () => {
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
    cy.createList(name);

    cy.visit('/lists');

    cy.contains(name);
  });

  it('Should see one of the users lists.', () => {
    cy.createList(name);

    cy.visit('/lists')
    waitForElement(cy, '.list')

    cy.get('.list').click()

    waitForElement(cy, '#list')

    cy.contains(name)
  })

  it('Should add a product to a shopping list.', () => {
    cy.createList(name);
    cy.visit('/lists')
    waitForElement(cy, '.list')

    cy.get('.list').click()
    waitForElement(cy, '#list')

    cy
      .get('#product-search')
      .type('Sau');

    cy
      .get('.product')
      .first()
      .find('button')
      .click()

    cy.get('#list-products').find('li').its('length').should('be.eq', 1)
  })

  it('Should hide product from search when it is added to the list', () => {
    cy.createList(name);
    cy.visit('/lists')
    waitForElement(cy, '.list')

    cy.get('.list').click()
    waitForElement(cy, '#list')

    cy
      .get('#product-search')
      .type('Len');

    cy
      .get('.product')
      .first()
      .find('button')
      .click()

    cy.get('.product', { timeout: 0 }).should('not.exist');
  })

  it('Should delete a product in a list.', () => {
    cy.createList(name);
    cy.visit('/lists')
    waitForElement(cy, '.list')

    cy.get('.list').click()
    waitForElement(cy, '#list')

    cy
      .get('#product-search')
      .type('Sau');

    cy
      .get('.product')
      .first()
      .find('button')
      .click()

    cy
      .get('#list-products')
      .first()
      .find('.delete')
      .click()

    cy.get('#list-products', { timeout: 0 }).should('not.exist');
  })

  it('Should delete a list.', () => {
    cy.createList(name)

    cy.visit('/lists')

    waitForElement(cy, '.list')

    cy.get('.list:first-child button').click()

    cy
      .get('body')
      .find('.list')
      .should('have.length', 0)
  })

  it('Should mark product as buyed', () => {
    cy.createList(name);
    cy.visit('/lists')
    waitForElement(cy, '.list')

    cy.get('.list').click()
    waitForElement(cy, '#list')

    cy
      .get('#product-search')
      .type('Sau');

    cy
      .get('.product')
      .first()
      .find('button')
      .click()

    cy
      .get('#list-products li')
      .find('input[type="checkbox"]')
      .click()

    cy
      .get('#list-products li')
      .find('input[type="checkbox"]')
      .should('be.checked')

    cy
      .get('#list-products li')
      .find('input[type="checkbox"]')
      .click()

    cy
      .get('#list-products li')
      .find('input[type="checkbox"]')
      .should('not.be.checked')
  })
});
