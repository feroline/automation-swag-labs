//TODO colocar url em arquivos separados
import URLS from "../support/elements/URLS.cy";
import LoginElements from "../support/elements/LoginElements.cy";
import HomeElements from "../support/elements/HomeElements.cy";

//TODO Adicionar acesso ao login no arquivo e2e
// beforeEach(() => {
//   cy.visit('/');
//   cy.url().should("eq", URLS.LOGIN);
// });

describe("Login", () => {
  it("Login com usuário Standard", () => {

    cy.fixture("login")
      .as("loginFixture")
      .then((usuario) => {
        cy.inserirLogin(usuario.usernames.standard_user, usuario.password);
      });

      cy.get(LoginElements.buttonLogin)
      .click();
      
      cy.url().should("contains", URLS.HOME);
    
  });

  it("Login com usuário locked_out_user", () => {

    const messageErro = "Epic sadface: Sorry, this user has been locked out."
    
    cy.fixture("login")
    .as("loginFixture")
    .then((usuario) => {
      cy.inserirLogin(usuario.usernames.locked_out_user, usuario.password);
    });

    cy.get(LoginElements.buttonLogin)
    .click();
    
    cy.get(LoginElements.divErrorMessage).should('contain', messageErro);
    cy.url().should("contains", URLS.LOGIN);

  
  });

  it("Login com problem_user", () => {
    let imagemDeErro = "/static/media/sl-404.168b1cce.jpg"

    cy.fixture("login")
    .as("loginFixture")
    .then((usuario) => {
      cy.inserirLogin(usuario.usernames.problem_user, usuario.password);
    });
    
    cy.get(LoginElements.buttonLogin)
      .click();
    
    cy.url().should("contains", URLS.HOME);

    cy.get(HomeElements.imagemDeErro)
      .should('have.attr', 'src', imagemDeErro)
   

  });

  it("Login com performance_glitch_user", () => {
    const messageErro = "Epic sadface: Sorry, this user has been locked out."
    
    cy.fixture("login")
    .as("loginFixture")
    .then((usuario) => {
      cy.inserirLogin(usuario.usernames.performance_glitch_user, usuario.password);
    });

    cy.get(LoginElements.buttonLogin)
    .click();
     
    cy.url().should("contains", URLS.HOME);

    // O tempo médio de resposta deve ser de até 4s para uma boa exepriência de usuário
    cy.reload({timeout:4000});

  
  });
  
  
  it("Login com usuário error_user", () => {
    cy.fixture("login")
    .as("loginFixture")
    .then((usuario) => {
      cy.inserirLogin(usuario.usernames.error_user, usuario.password);
    });

    cy.get(LoginElements.buttonLogin)
    .click();

    cy.url().should("contains", URLS.HOME);

    cy.get(HomeElements.buttonAddCartBackpack)
    .should('contains.text', 'Add to cart')
    .then($btn => {
      
      $btn.click();
      expect($btn).to.not.exist;

      cy.get(HomeElements.buttonRemoveCartBackpack)
        .should('exist')
        .click().then(() => {
          expect($btn).to.exist;
        });
      
    });

  });


  it("Login com usuário visual_user", () => {

    cy.fixture("login")
    .as("loginFixture")
    .then((usuario) => {
      cy.inserirLogin(usuario.usernames.visual_user, usuario.password);
    });

    cy.get(LoginElements.buttonLogin)
    .click();

    cy.url().should("contains", URLS.HOME);

  });

});
