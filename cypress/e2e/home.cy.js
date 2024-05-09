import URLS from "../support/elements/URLS.cy";
import HomeElements from "../support/elements/HomeElements.cy";

beforeEach(() => {
   cy.login();
});

describe("Home", () => {
    it("Verificar produtos da listagem", () => {

        cy.get('[data-test="inventory-list"]').children().should('have.length', 6);

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
        it("Adicionar produto ao carrinho", () => {});
        it("Verificar quantidade de produtos no carrinho", () => {});

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
    



