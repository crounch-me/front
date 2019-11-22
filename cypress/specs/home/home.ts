describe('Home', () => {
  it('Should display the home title.', () => {
    cy.visit('/')
    cy.contains('h1', 'Do you want to Crounch ?')
  });
});
