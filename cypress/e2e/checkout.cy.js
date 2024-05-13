import CartElements from "../support/elements/CartElements.cy";
import HomeElements from "../support/elements/HomeElements.cy";
import URLS from "../support/elements/URLS.cy";

beforeEach(() => {
   cy.login();
   cy.fixture("inventory").as("inventoryFixture");
});
describe("Checkout", () => {
    it("Inserir Dados válidos - Checkout Complete", () => {

        addItemsToCart();

        cy.get('[data-test="title"]').should('have.text', 'Checkout: Your Information');
        cy.get('[data-test="firstName"]').type('Ana Maria');
        cy.get('[data-test="lastName"]').type('Silva');
        cy.get('[data-test="postalCode"]').type('77005-789');
        cy.get('[data-test="continue"]').click();

        cy.get('[data-test="title"]').should('have.text', 'Checkout: Overview');
        cy.url().should('contains', URLS.CHECKOUT_STEP_TWO);

        cy.get('@inventoryFixture').then((inventory) => {
            cy.get(CartElements.listCartItems).should('have.length', inventory.produtos.length);
        });

        let subtotal = 0.0;
        cy.get(HomeElements.divPrice).each(price => {
            subtotal += getFloatNumber(price);
        }).then(() => {
            cy.get('[data-test="subtotal-label"]').should('have.text', 'Item total: $' + subtotal.toFixed(2));
        });

        cy.get('[data-test="finish"]').click();
        cy.url().should('contains', URLS.CHECKOUT_COMPLETE);
        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
        cy.get('[data-test="back-to-products"]').click();
        cy.url().should('contains', URLS.HOME);
    });

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

let getFloatNumber = (string) => {
    return parseFloat(string.text().replace('$', ''));
}