
import URLS from "../support/elements/URLS.cy";
import LoginElements from "../support/elements/LoginElements.cy";
import HomeElements from "../support/elements/HomeElements.cy";

beforeEach(() => {
  cy.fixture("login").as("loginFixture")
});

describe("Login", () => {
  it("Login com usuário Standard", () => {

    cy.get('@loginFixture').then((usuario) => {
        cy.inserirLogin(usuario.usernames.standard_user, usuario.password);
      });
      
      cy.url().should("contains", URLS.HOME);
    
  });

  it("Login com usuário locked_out_user", () => {

    cy.get('@loginFixture').then((usuario) => {
      cy.inserirLogin(usuario.usernames.locked_out_user, usuario.password);
      cy.get(LoginElements.divErrorMessage).should('contain', usuario.mensagensErro.errorMessagelockedOut);
    });
    
    cy.url().should("contains", URLS.LOGIN);

  
  });

  it("Login com problem_user", () => {

    cy.get('@loginFixture').then((usuario) => {
      cy.inserirLogin(usuario.usernames.problem_user, usuario.password);
      
      cy.url().should("contains", URLS.HOME);
      
      cy.get(HomeElements.imagemDeErro)
      .should('have.attr', 'src', usuario.mensagensErro.imagemDeErro)
    });
   

  });

  it("Login com performance_glitch_user", () => {

    cy.get('@loginFixture').then((usuario) => {
      cy.inserirLogin(usuario.usernames.performance_glitch_user, usuario.password);
    });
     
    cy.url().should("contains", URLS.HOME);

    // O tempo médio de resposta deve ser de até 4s para uma boa exepriência de usuário
    cy.reload({timeout:4000});

  
  });
  
  
  it("Login com usuário error_user", () => {

    cy.get('@loginFixture').then((usuario) => {
      cy.inserirLogin(usuario.usernames.error_user, usuario.password);
    });

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

    cy.get('@loginFixture').then((usuario) => {
      cy.inserirLogin(usuario.usernames.visual_user, usuario.password);
    });

    cy.url().should("contains", URLS.HOME);

  });

  it("Login com usuário e senha inválidos", () => {
    
    cy.get('@loginFixture').then((usuario) => {
      cy.inserirLogin(usuario.usuarioInvalido.username, usuario.usuarioInvalido.password);
      
      cy.get(LoginElements.divErrorMessage)
        .should('contain', usuario.mensagensErro.errorMessageGeneric);
    });
    
    cy.url().should("contains", URLS.LOGIN);
  
  });

  
  it("Login com usuário inválido e senha válida", () => {

    cy.get('@loginFixture').then((usuario) => {
      cy.inserirLogin(usuario.usuarioInvalido.password, usuario.password);
      
      cy.get(LoginElements.divErrorMessage)
        .should('contain', usuario.mensagensErro.errorMessageGeneric);
    });
    
    cy.url().should("contains", URLS.LOGIN);
  
  });

  it("Login com usuário válido e senha inválida", () => {

    cy.get('@loginFixture').then((usuario) => {
      cy.inserirLogin(usuario.usernames.standard_user, usuario.usuarioInvalido.password);
      
      cy.get(LoginElements.divErrorMessage)
        .should('contain', usuario.mensagensErro.errorMessageGeneric);
    });
    
    cy.url().should("contains", URLS.LOGIN);
  
  });

  it("Login com usuário inválido e senha vazia", () => {

    cy.get('@loginFixture').then((usuario) => {
      cy.inserirLogin(usuario.usernames.standard_user, usuario.usuarioSenhaVazio.password);
      
      cy.get(LoginElements.divErrorMessage)
        .should('contain', usuario.mensagensErro.errorMessageGeneric);
    });
    
    cy.url().should("contains", URLS.LOGIN);
  
  });


  it("Login com usuário inválido e senha vazia", () => {

    cy.get('@loginFixture').then((usuario) => {
      cy.inserirLogin(usuario.usuarioSenhaVazio.username, usuario.password);
      
      cy.get(LoginElements.divErrorMessage)
        .should('contain', usuario.mensagensErro.errorMessageGeneric);
    });
    
    cy.url().should("contains", URLS.LOGIN);
  
  });

  it("Login com usuário e senhas vazios", () => {
    
    cy.get('@loginFixture').then((usuario) => {
      cy.inserirLogin(usuario.usuarioSenhaVazio.username, usuario.usuarioSenhaVazio.password);
      
      cy.get(LoginElements.divErrorMessage)
        .should('contain', usuario.mensagensErro.errorMessageGeneric);
    });
    
    cy.url().should("contains", URLS.LOGIN);
  
  });

  it("Login sem usuário e senha", () => {
   

    cy.get(LoginElements.buttonLogin)
    .click();

    cy.fixture("login").as("loginFixture").then((usuario) => {
      cy.get(LoginElements.divErrorMessage)
        .should('contain', usuario.mensagensErro.errorMessageUsername);
    });
    
    cy.url().should("contains", URLS.LOGIN);
  
  });
});
