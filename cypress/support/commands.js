// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import LoginElements from "../support/elements/LoginElements.cy";
import URLS from "../support/elements/URLS.cy";

Cypress.Commands.add('inserirLogin', (username, password) => {
    cy.get(LoginElements.inputUsername)
    .type(username);

  cy.get(LoginElements.inputPassword)
    .type(password);

  cy.get(LoginElements.buttonLogin)
    .click();

});

Cypress.Commands.add('login', () => {

  cy.fixture("login")
  .as("loginFixture")
  .then((usuario) => {
    cy.inserirLogin(usuario.usernames.standard_user, usuario.password);
  });
  
  cy.url().should("contains", URLS.HOME);
  
});