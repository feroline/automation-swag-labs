const URL_LOGIN = "https://www.saucedemo.com/";
const URL_HOME = "https://www.saucedemo.com/inventory.html";

beforeEach(() => {
  cy.visit(URL_LOGIN);
  cy.url().should("eq", URL_LOGIN);
});

describe("Login Válido", () => {
  it("Login Válido", () => {
    
    cy.fixture("login")
      .as("loginFixture")
      .then((usuario) => {
        cy.get("input[data-test='username']")
          .type(usuario.usernames.standard_user);

        cy.get("input[data-test='password']")
          .type(usuario.password);
      });

    cy.get("input[data-test='login-button']")
      .click()
      .then(() => {
        cy.url().should("eq", URL_HOME);
      });
  });
});
