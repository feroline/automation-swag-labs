import URLS from "../support/elements/URLS.cy";
import HomeElements from "../support/elements/HomeElements.cy";

beforeEach(() => {
   cy.login();
});

describe("Home", () => {
    it("Verificar produtos da listagem", () => {});
    
    describe("Validar Carrinho", () => {
        it("Adicionar produto ao carrinho", () => {});
        it("Validar quantidade de produtos no carrinho", () => {});

    });

    describe("Validar Links", () => {
        it("Validar link Twitter", () => {});
        it("Validar link Facebook", () => {});
        it("Validar link Linkedin", () => {});
    })

    describe("Validar Filtragem", () => {
        it("Filtro por Nome - A a Z", () => {});
        it("Filtro por Nome - Z a A", () => {});
        it("Filtro por Preço - Low a High", () => {});
        it("Filtro por Preço - High a Low", () => {});
    });
});
    



