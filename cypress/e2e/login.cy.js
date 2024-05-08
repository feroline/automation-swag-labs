const URL_LOGIN = "https://www.saucedemo.com/";
const URL_HOME = "https://www.saucedemo.com/inventory.html";

import LoginElements from "../support/elements/LoginElements.cy";

beforeEach(() => {
  cy.visit(URL_LOGIN);
  cy.url().should("eq", URL_LOGIN);
});

describe("Login", () => {
  it("Login com usuário Standard", () => {

    cy.fixture("login")
      .as("loginFixture")
      .then((usuario) => {
        inserirLogin(usuario.usernames.standard_user, usuario.password);
      });

      cy.get(LoginElements.buttonLogin)
      .click()
      .then(() => {
        cy.url().should("eq", URL_HOME);
      });
    
  });

  it("Login com usuário locked_out_user", () => {

    const messageErro = "Epic sadface: Sorry, this user has been locked out."
    
    cy.fixture("login")
    .as("loginFixture")
    .then((usuario) => {
      inserirLogin(usuario.usernames.locked_out_user, usuario.password);
    });

    cy.get(LoginElements.buttonLogin)
    .click()
    .then(() => {
      cy.get(LoginElements.divErrorMessage).should('contain', messageErro);
      cy.url().should("eq", URL_LOGIN);
    });
  
  });

  it.only("Login com problem_user", () => {
    let imagemDeErro = "/static/media/sl-404.168b1cce.jpg"

    cy.fixture("login")
    .as("loginFixture")
    .then((usuario) => {
      inserirLogin(usuario.usernames.problem_user, usuario.password);
    });
    
    cy.get(LoginElements.buttonLogin)
    .click()
    .then(() => {
      cy.get("img[data-test='inventory-item-sauce-labs-backpack-img']")
      .should('have.attr', 'src', imagemDeErro)
    });

  });
});




let inserirLogin = (username, password) => {
  
  cy.get(LoginElements.inputUsername)
    .type(username);

  cy.get(LoginElements.inputPassword)
    .type(password);

  

}