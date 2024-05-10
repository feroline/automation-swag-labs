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
        it("Verificar link Twitter", () => {
            let link = cy.fixture("linksExternos").as("linksExternos").then((link) => {
                cy.get(HomeElements.buttonTwitter).should("have.attr", "href", link.twitter);
            });

        });
        it("Verificar link Facebook", () => {
            let link = cy.fixture("linksExternos").as("linksExternos").then((link) => {
                cy.get(HomeElements.buttonFacebook).should("have.attr", "href", link.facebook );
            });
        });
        
        it("Verificar link Linkedin", () => {
            let link = cy.fixture("linksExternos").as("linksExternos").then((link) => {
                cy.get(HomeElements.buttonLinkedin).should("have.attr", "href", link.linkedin );
            });
        });
    })

    describe("Verificar Filtragem", () => {

        it("Verificar opções do filtro", () => {
            cy.get(HomeElements.selectFiltro) 
                .should('contains.text', 'Name (A to Z)')
                .should('contains.text', 'Name (Z to A)')
                .should('contains.text', 'Price (low to high)')
                .should('contains.text', 'Price (high to low)');
   
        });

        it("Filtro por Nome - A a Z", () => {

            let resultFiltro = []; 
            let resultFiltroOrdenado = [];

            cy.get(HomeElements.selectFiltro).select('az');
            cy.get(HomeElements.spanSelectFiltro).should('have.text', 'Name (A to Z)'); 

            cy.get(HomeElements.spanName).each(nomeProdutos => {
                resultFiltro.push(nomeProdutos.text());
            }).then(() => {
                resultFiltroOrdenado = resultFiltro.sort();
                expect(resultFiltro).to.deep.equal(resultFiltroOrdenado);
            });
            
        });

        it("Filtro por Nome - Z a A", () => {
            let resultFiltro = []; 
            let resultFiltroOrdenado = [];

            cy.get(HomeElements.selectFiltro).select('za');
            cy.get(HomeElements.spanSelectFiltro).should('have.text', 'Name (Z to A)'); 

            cy.get(HomeElements.spanName).each(nomeProdutos => {
                resultFiltro.push(nomeProdutos.text());
            }).then(() => {
                resultFiltroOrdenado = resultFiltro.sort().reverse();
                expect(resultFiltro).to.deep.equal(resultFiltroOrdenado);
            });

        });
                
        it("Filtro por Preço - Low a High", () => {
            let resultFiltro = []; 
            let resultFiltroOrdenado = [];

            cy.get(HomeElements.selectFiltro).select('lohi');
            cy.get(HomeElements.spanSelectFiltro).should('have.text', 'Price (low to high)'); 

            cy.get(HomeElements.divPrice).each(price => {
                resultFiltro.push(
                    parseFloat(
                        price.text().replace('$', ''))
                    );
            }).then(() => {
                resultFiltroOrdenado = resultFiltro.sort(
                    function(a,b){return a-b}
                );

                expect(resultFiltro).to.deep.equal(resultFiltroOrdenado);
            });

        });

        //option[value="hilo"]
        it("Filtro por Preço - High a Low", () => {

            let resultFiltro = []; 
            let resultFiltroOrdenado = [];

            cy.get(HomeElements.selectFiltro).select('hilo');
            cy.get(HomeElements.spanSelectFiltro).should('have.text', 'Price (high to low)'); 

            cy.get(HomeElements.divPrice).each(price => {
                resultFiltro.push(
                    parseFloat(
                        price.text().replace('$', ''))
                    );
            }).then(() => {
                resultFiltroOrdenado = resultFiltro.sort(
                    function(a,b){return a-b}
                ).reverse();

                expect(resultFiltro).to.deep.equal(resultFiltroOrdenado);
 
            });

        });
    });
});
    



