import CartElements from "../support/elements/CartElements.cy";
import HomeElements from "../support/elements/HomeElements.cy";
import URLS from "../support/elements/URLS.cy";
import CheckoutElements from "../support/elements/CheckoutElements.cy";

beforeEach(() => {
   cy.login();
   cy.fixture("inventory").as("inventoryFixture");
   cy.fixture("checkout").as("checkoutFixture");
});
describe("Checkout", () => {
    it("Inserir Dados válidos - Checkout Complete", () => {

        addItemsToCart();

        cy.get("@checkoutFixture").then((checkout) => {
            cy.get(CheckoutElements.title).should('have.text', checkout.mensagens.information);
            cy.get(CheckoutElements.inputFirstname).type(checkout.dadosCompra.dadosValidos.nome);
            cy.get(CheckoutElements.inputLastname).type(checkout.dadosCompra.dadosValidos.sobrenome);
            cy.get(CheckoutElements.inputPostalZipcode).type(checkout.dadosCompra.dadosValidos.zipcode);
            cy.get(CheckoutElements.buttonContinue).click();

        
            cy.get(CheckoutElements.title).should('have.text', checkout.mensagens.overview);

            cy.url().should('contains', URLS.CHECKOUT_STEP_TWO);
        
            cy.get('@inventoryFixture').then((inventory) => {
                cy.get(CartElements.listCartItems).should('have.length', inventory.produtos.length);
            });
            
            let subtotal = 0.0;
            cy.get(HomeElements.divPrice).each(price => {
                subtotal += getFloatNumber(price);
            }).then(() => {
                cy.get(CheckoutElements.labelSubtotal).should('have.text', checkout.mensagens.itemTotal + subtotal.toFixed(2));
            });
            
            cy.get(CheckoutElements.buttonFinish).click();
            cy.url().should('contains', URLS.CHECKOUT_COMPLETE);

            cy.get(CheckoutElements.spanCompleteHeader).should('have.text', checkout.mensagens.finish);
            cy.get(CheckoutElements.buttonBackHome).click();
            cy.url().should('contains', URLS.HOME);

        });
        
       
    });

    it.only("Inserir dados vázios", () => {

        addItemsToCart();

        cy.get("@checkoutFixture").then((checkout) => {
            cy.get(CheckoutElements.title).should('have.text', checkout.mensagens.information);
            cy.get(CheckoutElements.inputFirstname).type(checkout.dadosCompra.dadosVazios.nome);
            cy.get(CheckoutElements.inputLastname).type(checkout.dadosCompra.dadosVazios.sobrenome);
            cy.get(CheckoutElements.inputPostalZipcode).type(checkout.dadosCompra.dadosVazios.zipcode);
            cy.get(CheckoutElements.buttonContinue).click();

            cy.get(CheckoutElements.errorMessage)
                .should('be.visible')
                .and('have.text', checkout.mensagens.errorMessages.firstname);
        });

        cy.url().should('contains', URLS.CHECKOUT_STEP_ONE);

    
    })

});

let addItemsToCart = () => {
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
        
}

//TODO: MOVER PARA O COMMANDS, TANTO COMO O DA HOME QUANTO O DO CHECKOUT
let getFloatNumber = (string) => {
    return parseFloat(string.text().replace('$', ''));
}