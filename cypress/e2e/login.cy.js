//TODO colocar url em arquivos separados
const URL_LOGIN = "https://www.saucedemo.com/";
const URL_HOME = "https://www.saucedemo.com/inventory.html";

import LoginElements from "../support/elements/LoginElements.cy";

//TODO Adicionar acesso ao login no arquivo e2e
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
      .click();
      
      cy.url().should("eq", URL_HOME);
    
  });

  it("Login com usuário locked_out_user", () => {

    const messageErro = "Epic sadface: Sorry, this user has been locked out."
    
    cy.fixture("login")
    .as("loginFixture")
    .then((usuario) => {
      inserirLogin(usuario.usernames.locked_out_user, usuario.password);
    });

    cy.get(LoginElements.buttonLogin)
    .click();
    
    cy.get(LoginElements.divErrorMessage).should('contain', messageErro);
    cy.url().should("eq", URL_LOGIN);

  
  });

  it("Login com problem_user", () => {
    let imagemDeErro = "/static/media/sl-404.168b1cce.jpg"

    cy.fixture("login")
    .as("loginFixture")
    .then((usuario) => {
      inserirLogin(usuario.usernames.problem_user, usuario.password);
    });
    
    cy.get(LoginElements.buttonLogin)
      .click();
    
    cy.get("img[data-test='inventory-item-sauce-labs-backpack-img']")
      .should('have.attr', 'src', imagemDeErro)
   

  });

  it("Login com performance_glitch_user", () => {
    const messageErro = "Epic sadface: Sorry, this user has been locked out."
    
    cy.fixture("login")
    .as("loginFixture")
    .then((usuario) => {
      inserirLogin(usuario.usernames.performance_glitch_user, usuario.password);
    });

    cy.get(LoginElements.buttonLogin)
    .click();
     
    cy.url().should("eq", URL_HOME);
    // O tempo médio de resposta deve ser de até 4s para uma boa exepriência de usuário
    cy.reload({timeout:4000});

  
  });
  
  //TODO error_user
  it.only("Login com usuário error_user", () => {
    cy.fixture("login")
    .as("loginFixture")
    .then((usuario) => {
      inserirLogin(usuario.usernames.error_user, usuario.password);
    });

    cy.get(LoginElements.buttonLogin)
    .click();

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
    .should('contains.text', 'Add to cart')
    .then($btn => {
      
      $btn.click();
      expect($btn).to.not.exist;

      cy.get('[data-test="remove-sauce-labs-backpack"]')
        .should('exist')
        .click();

      expect($btn).to.exist;
      
    });


  });

  //TODO visual_user

});

let inserirLogin = (username, password) => {
  
  cy.get(LoginElements.inputUsername)
    .type(username);

  cy.get(LoginElements.inputPassword)
    .type(password);

  

}