import MenuElements from "../support/elements/MenuElements.cy";
import HomeElements from "../support/elements/HomeElements.cy";

beforeEach(() => {
   cy.login();
   cy.fixture("menu").as("menuFixture");
});

describe("Menu ", () => {
   
   describe("Visibilidade menu", () => {

      it("Menu não visível", () => {
         cy.get(MenuElements.divMenu)
         .should("exist")
         .should("be.not.visible");
      });

      it("Menu visível", () => {

         cy.get(MenuElements.buttonMenu)
            .should("be.visible")
            .click();
         
         cy.get(MenuElements.divMenu).should("be.visible");
         
      });

      it("Verificar opções Menu", () => {
         cy.get(MenuElements.buttonMenu)
         .click();
         
         cy.get("@menuFixture").then((menu) => {
            cy.get(MenuElements.sidebarLinkInventory).should("contains.text", menu.allItems.text )
            cy.get(MenuElements.sidebarLinkAbout).should("contains.text", menu.about.text)
            cy.get(MenuElements.sidebarLinkLogout).should("contains.text", menu.logout.text)
            cy.get(MenuElements.sidebarLinkResetAppState).should("contains.text", menu.resetAppState.text)
         });
         
      })
   });
   describe("About", () => {
      it.only("Opção About", () => {
         cy.get(MenuElements.buttonMenu)
         .click();
         
         cy.get(MenuElements.sidebarLinkAbout).click();

         cy.get("@menuFixture").then((menu) => {
            cy.get('.MuiBox-root')
               .should("contains.text", menu.about.textBody);
            cy.url().should('be.equal', menu.about.url)
         });
      });

      it("Retornar após About", () => {});
   });

   describe.skip("Logout", () => {
      it("Opção Logout", () => {});

      it("Retornar após Logout", () => {});
   });

   it("Reset App State", () => {});

   it("All items", () => {});
});