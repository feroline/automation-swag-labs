import URLS from "../support/elements/URLS.cy";
import HomeElements from "../support/elements/HomeElements.cy";

beforeEach(() => {
   cy.login();
});

Describe("Home", () => {
    it("Verificar produtos da listagem", () => {});
    
    Describe("Validar Carrinho", () => {
        it("Adicionar produto ao carrinho", () => {});
        it("Validar quantidade de produtos no carrinho", () => {});

    });

    Describe("Validar Links", () => {
        it("Validar link Twitter", () => {});
        it("Validar link Facebook", () => {});
        it("Validar link Linkedin", () => {});
    })

    Describe("Validar Filtragem", () => {
        it("Filtro por Nome - A a Z", () => {});
        it("Filtro por Nome - Z a A", () => {});
        it("Filtro por Preço - Low a High", () => {});
        it("Filtro por Preço - High a Low", () => {});
    });
});
    



