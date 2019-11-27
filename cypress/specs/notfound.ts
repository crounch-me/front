describe('NotFound', () => {
  it('Should display a not found message when on unknown url.', () => {
    cy.visit('/not-found');

    cy
      .get('h1')
      .contains('Page non trouvée');
  });
});
