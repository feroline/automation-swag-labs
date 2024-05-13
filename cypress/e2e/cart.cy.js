import CartElements from "../support/elements/CartElements.cy";
import HomeElements from "../support/elements/HomeElements.cy";
import URLS from "../support/elements/URLS.cy";

beforeEach(() => {
   cy.login();
   cy.fixture("inventory").as("inventoryFixture");
});

describe("Carrinho", () => {
    it("Verificar todos os produtos adicionados ao carrinho", () => {
        cy.get(HomeElements.buttonAddCartBackpack).click();
        cy.get(HomeElements.buttonAddCartBikeLight).click();
        cy.get(HomeElements.buttonAddCartBoltTShirt).click();
        cy.get(HomeElements.buttonAddCartFleeceJacket).click();
        cy.get(HomeElements.buttonAddCartOnesie).click();
        cy.get(HomeElements.buttonAddCartTShirtRed).click();
        
        cy.get(HomeElements.buttonCart).click();
        cy.url().should('contains', URLS.CART);

        
        cy.get('@inventoryFixture').then((inventory) => {
            cy.get(CartElements.listCartItems).should("have.length", inventory.produtos.length);
        });

    });

    it("Remover um produto do carrinho", () => {
        cy.get(HomeElements.buttonAddCartBackpack).click();
        cy.get(HomeElements.buttonAddCartBikeLight).click();
        cy.get(HomeElements.buttonAddCartBoltTShirt).click();
        cy.get(HomeElements.buttonAddCartFleeceJacket).click();
        cy.get(HomeElements.buttonAddCartOnesie).click();
        cy.get(HomeElements.buttonAddCartTShirtRed).click();
        
        cy.get(HomeElements.buttonCart).click();
        cy.url().should('contains', URLS.CART);

        
        cy.get('@inventoryFixture').then((inventory) => {
            cy.get(CartElements.listCartItems).should("have.length", inventory.produtos.length);
        });
        
        cy.get(HomeElements.buttonRemoveCartBackpack).click();

              
        cy.get('@inventoryFixture').then((inventory) => {
            cy.get(CartElements.listCartItems).should("have.length", inventory.produtos.length - 1);
        });

    });
    it("Realizar Continuação das compras (Continue Shopping)", () => {
        cy.get(HomeElements.buttonAddCartBackpack).click();
        cy.get(HomeElements.buttonAddCartBikeLight).click();
        cy.get(HomeElements.buttonAddCartBoltTShirt).click();
        
        cy.get(HomeElements.buttonCart).click();
        cy.url().should('contains', URLS.CART);

        
        cy.get('@inventoryFixture').then((inventory) => {
            cy.get(CartElements.listCartItems).should("have.length", inventory.produtos.length - 3);
        });

        cy.get(CartElements.buttonContinueShopping).click();
        cy.url().should('contains', URLS.HOME);
        cy.get(HomeElements.buttonAddCartFleeceJacket).click();
        cy.get(HomeElements.buttonAddCartOnesie).click();

        cy.get(HomeElements.buttonCart).click();
        cy.url().should('contains', URLS.CART);

        cy.get('@inventoryFixture').then((inventory) => {
           
            cy.get(CartElements.listCartItems).should("have.length", inventory.produtos.length - 1);
        });

    });
    
    /**
     * TODO:APÓS IMPLEMENTAR VALIDAÇÃO PARA TELA DE CHECKOUT, IMPLEMENTAR TESTES APENAS NA TELA DE CHECKOUT COM ARQUIVO SEPARADO
     * CHECKOUT.CY.JS
     * CHECKOUT APENAS COM FIRSTNAME
     * CHECKOUT APENAS COM LASTNAME
     * CHECKOUT APENAS COM ZIPCODE
     * CHECKOUT COM SUCESSO
     * CHECKOUT COM DADOS INVÁLIDOS APENAS NÚMEROS
     * CHECKOUT COM DADOS INVÁLIDOS APENAS LETRAS
     * CHECKOUT COM ESPAÇO EM BRANCO 
     * VALIDAR DADOS DA TELA DE Checkout: Overview
     * VALIDAR CHECKOUT FINALIZADO
     * */

    it("Realizar Checkout", () => {

        cy.get(HomeElements.buttonAddCartBackpack).click();
        cy.get(HomeElements.buttonAddCartBikeLight).click();
        cy.get(HomeElements.buttonAddCartBoltTShirt).click();
        cy.get(HomeElements.buttonAddCartFleeceJacket).click();
        cy.get(HomeElements.buttonAddCartOnesie).click();
        cy.get(HomeElements.buttonAddCartTShirtRed).click();
        
        cy.get(HomeElements.buttonCart).click();
        cy.url().should('contains', URLS.CART);

        cy.get('@inventoryFixture').then((inventory) => {
            cy.get(CartElements.listCartItems).should("have.length", inventory.produtos.length );
        });

        cy.get(CartElements.buttonCheckout).click();
        cy.url().should('contains', URLS.CHECKOUT_STEP_ONE);

    });
});