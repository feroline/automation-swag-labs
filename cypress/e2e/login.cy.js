const URL_LOGIN = "https://www.saucedemo.com/";
const URL_HOME = "https://www.saucedemo.com/inventory.html";

import LoginElements from "../support/elements/LoginElements.cy";

beforeEach(() => {
  cy.visit(URL_LOGIN);
  cy.url().should("eq", URL_LOGIN);
});

describe("Login Válido", () => {
  it("Login Válido", () => {

    cy.fixture("login")
      .as("loginFixture")
      .then((usuario) => {
        cy.get(LoginElements.inputUsername)
          .type(usuario.usernames.standard_user);

        cy.get()
          .type(usuario.password);
      });

    cy.get("input[data-test='login-button']")
      .click()
      .then(() => {
        cy.url().should("eq", URL_HOME);
      });
  });
});
