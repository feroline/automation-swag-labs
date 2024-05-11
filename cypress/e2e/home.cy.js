import HomeElements from "../support/elements/HomeElements.cy";

beforeEach(() => {
   cy.login();
   cy.fixture("inventory").as("inventoryFixture");
});

describe("Home", () => {
    it("Verificar produtos da listagem", () => {

        cy.get('@inventoryFixture').then((inventory) => {
        
        cy.get(HomeElements.inventoryList).children().should('have.length', inventory.produtos.length); 
            
            let produtos = inventory.produtos
     
            //Verifica se os produtos estão aparecendo na tela de acordo com a fixture Inventory.json
            produtos.forEach((produto, index) => {
                cy.get(`[data-test="${produto}"]`)
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
            
            cy.get('@inventoryFixture').then((inventory) => {
                cy.get(HomeElements.cartBadge).should("have.text", inventory.produtos.length); 
            })

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
             
            cy.get('@inventoryFixture').then((inventory) => {
                cy.get(HomeElements.cartBadge).should("have.text",  inventory.produtos.length - 1);
            })

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
        
            cy.get('@inventoryFixture').then((inventory) => {
                cy.get(HomeElements.selectFiltro) 
                    .should('contains.text', inventory.filtros.aToZ.text)
                    .should('contains.text', inventory.filtros.zToA.text)
                    .should('contains.text', inventory.filtros.loToHi.text)
                    .should('contains.text', inventory.filtros.hiToLo.text);
            });

        });
        
        it("Filtro por Nome - A a Z", () => {
            
            let resultFiltro = []; 
            let resultFiltroOrdenado = [];
            
            cy.get('@inventoryFixture').then((inventory) => {
                cy.get(HomeElements.selectFiltro).select(inventory.filtros.aToZ.value); 
                cy.get(HomeElements.spanSelectFiltro).should('have.text', inventory.filtros.aToZ.text); 
            });            

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

            cy.get('@inventoryFixture').then((inventory) => {
                cy.get(HomeElements.selectFiltro).select(inventory.filtros.zToA.value); 
                cy.get(HomeElements.spanSelectFiltro).should('have.text', inventory.filtros.zToA.text); 
            });

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

            cy.get('@inventoryFixture').then((inventory) => {
                cy.get(HomeElements.selectFiltro).select(inventory.filtros.loToHi.value);
                cy.get(HomeElements.spanSelectFiltro).should('have.text', inventory.filtros.loToHi.text); 
            });

            cy.get(HomeElements.divPrice).each(price => {
                resultFiltro.push(getFloatNumber(price));
            }).then(() => {
                resultFiltroOrdenado = sortNumero(resultFiltro);

                expect(resultFiltro).to.deep.equal(resultFiltroOrdenado);
            });

        });

        it("Filtro por Preço - High a Low", () => {

            let resultFiltro = []; 
            let resultFiltroOrdenado = [];

            cy.get('@inventoryFixture').then((inventory) => {
                cy.get(HomeElements.selectFiltro).select(inventory.filtros.hiToLo.value);
                cy.get(HomeElements.spanSelectFiltro).should('have.text', inventory.filtros.hiToLo.text); 
            });

            cy.get(HomeElements.divPrice).each(price => {
                resultFiltro.push(getFloatNumber(price));
                    
            }).then(() => {
                resultFiltroOrdenado = sortNumero(resultFiltro).reverse();
                expect(resultFiltro).to.deep.equal(resultFiltroOrdenado);
 
            });

        });
    });
});

let sortNumero = (array) => {
    return array.sort((a, b) => a - b);
}

let getFloatNumber = (string) => {
    return parseFloat(string.text().replace('$', ''));
}