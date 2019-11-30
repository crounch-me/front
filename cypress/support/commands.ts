export function signup(email: string, password: string): Cypress.Chainable<Cypress.Response> {
  return cy.request('POST', 'http://localhost:3000/users', {
    email,
    password
  });
};

export function signupAndLogin(email: string, password: string): Cypress.Chainable<void> {
  return cy
    .request('POST', 'http://localhost:3000/users', {
      email,
      password,
    })
    .then(() => {
      return cy
        .request('POST', 'http://localhost:3000/users/login', {
          email,
          password,
        })
        .then(response => {
          localStorage.setItem('token', response.body.accessToken);
          return Promise.resolve();
        });
    });
}

export function createList(name: string): Cypress.Chainable<Cypress.Response> {
  return cy
    .request({
      method: 'POST',
      url: 'http://localhost:3000/lists',
      body: {
        name,
      },
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
}

Cypress.Commands.add('signup', signup);
Cypress.Commands.add('signupAndLogin', signupAndLogin);
Cypress.Commands.add('createList', createList);
