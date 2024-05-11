import MenuElements from "../support/elements/MenuElements.cy";
import HomeElements from "../support/elements/HomeElements.cy";

beforeEach(() => {
   cy.login();
   cy.fixture("inventory").as("inventoryFixture");
});

describe("Menu ", () => {
   
   describe.skip("Visibilidade menu", () => {
      it("Menu visível", () => {});

      it("Menu não visível", () => {});

   });
   describe("About", () => {
      it("Opção About", () => {});

      it("Retornar após About", () => {});
   });

   describe.skip("Logout", () => {
      it("Opção Logout", () => {});

      it("Retornar após Logout", () => {});
   });

   it("Reset App State", () => {});

   it("All items", () => {});
});