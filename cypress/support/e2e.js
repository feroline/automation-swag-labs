// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

//TODO colocar url em arquivos separados
import URLS from "../support/elements/URLS.cy";


//TODO Adicionar acesso ao login no arquivo e2e
beforeEach(() => {
  cy.visit('/');
  cy.url().should("eq", URLS.LOGIN);
});


// Alternatively you can use CommonJS syntax:
// require('./commands')