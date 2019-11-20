describe('Version', () => {
  it('Should display version for each back and front on version page.', () => {
    cy.visit('/version');

    cy
      .get('p')
      .contains(/Front: [0-9]+\.[0-9]+\.[0-9]+/);

    cy
      .get('p')
      .contains(/Back: [0-9]+\.[0-9]+\.[0-9]+/);
  });
});
