import URLS from "../support/elements/URLS.cy";
import HomeElements from "../support/elements/HomeElements.cy";

beforeEach(() => {
   cy.login();
});

describe("Home", () => {
    it("Verificar produtos da listagem", () => {

        cy.get(HomeElements.inventoryList).children().should('have.length', 6);

        cy.fixture("inventory").as("inventoryFixture").then((inventory) => {
            
            let produtos = inventory.produtos
     
            //Verifica se os produtos estão aparecendo na tela de acordo com a fixture Inventory.json
            produtos.forEach((produto, index) => {
                cy.get(`[data-test="${produto}"]`)
                console.log(produto)
            });

        });


    });
    
    describe("Validar Carrinho", () => {
        it("Adicionar todos os produto ao carrinho", () => {
            cy.get(HomeElements.buttonAddCartBackpack).click();
            cy.get(HomeElements.buttonAddCartBikeLight).click();
            cy.get(HomeElements.buttonAddCartBoltTShirt).click();
            cy.get(HomeElements.buttonAddCartFleeceJacket).click();
            cy.get(HomeElements.buttonAddCartOnesie).click();
            cy.get(HomeElements.buttonAddCartTShirtRed).click();

            cy.get(HomeElements.cartBadge).should("have.text", "6");
        });
        
        it("Adiciona um produto ao carrinho", () => {
            cy.get(HomeElements.buttonAddCartBackpack).click();
            cy.get(HomeElements.cartBadge).should("have.text", "1");
        })

        it("Remove todos os produto do carrinho", () => {
            cy.get(HomeElements.buttonAddCartBackpack).click();
            cy.get(HomeElements.buttonAddCartBikeLight).click();
            cy.get(HomeElements.buttonAddCartBoltTShirt).click();
            cy.get(HomeElements.buttonAddCartFleeceJacket).click();
            cy.get(HomeElements.buttonAddCartOnesie).click();
            cy.get(HomeElements.buttonAddCartTShirtRed).click();

            cy.get(HomeElements.buttonRemoveCartBackpack).click();
            cy.get(HomeElements.buttonRemoveCartBikeLight).click();
            cy.get(HomeElements.buttonRemoveCartBoltTShirt).click();
            cy.get(HomeElements.buttonRemoveCartFleeceJacket).click();
            cy.get(HomeElements.buttonRemoveCartOnesie).click();
            cy.get(HomeElements.buttonRemoveCartTShirtRed).click();

            cy.get(HomeElements.cartBadge).should("not.exist");
            
        });

        it("Remove um produto do carrinho", () => {
            cy.get(HomeElements.buttonAddCartBackpack).click();
            cy.get(HomeElements.buttonAddCartBikeLight).click();
            cy.get(HomeElements.buttonAddCartBoltTShirt).click();
            cy.get(HomeElements.buttonAddCartFleeceJacket).click();
            cy.get(HomeElements.buttonAddCartOnesie).click();
            cy.get(HomeElements.buttonAddCartTShirtRed).click();

            cy.get(HomeElements.buttonRemoveCartBackpack).click();
            cy.get(HomeElements.cartBadge).should("have.text", "5");
        });

    });

    describe("Verificar Links", () => {
        it("Verificar link Twitter", () => {});
        it("Verificar link Facebook", () => {});
        it("Verificar link Linkedin", () => {});
    })

    describe("Verificar Filtragem", () => {
        it("Filtro por Nome - A a Z", () => {});
        it("Filtro por Nome - Z a A", () => {});
        it("Filtro por Preço - Low a High", () => {});
        it("Filtro por Preço - High a Low", () => {});
    });
});
    



