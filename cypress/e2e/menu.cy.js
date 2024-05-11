import MenuElements from "../support/elements/MenuElements.cy";
import HomeElements from "../support/elements/HomeElements.cy";

beforeEach(() => {
   cy.login();
   cy.fixture("inventory").as("inventoryFixture");
});

describe("Menu ", () => {
   
   describe("Visibilidade menu", () => {

      it.only("Menu não visível", () => {
         cy.get(MenuElements.divMenu)
         .should("exist")
         .should("be.not.visible");
      });

      it.only("Menu visível", () => {

         cy.get(MenuElements.buttonMenu)
            .should("be.visible")
            .click();
         
         cy.get(MenuElements.divMenu).should("be.visible");
         
      });



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