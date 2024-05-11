import MenuElements from "../support/elements/MenuElements.cy";
import LoginElements from "../support/elements/LoginElements.cy";
import HomeElements from "../support/elements/HomeElements.cy";
import URLS from "../support/elements/URLS.cy";

beforeEach(() => {
   cy.login();
   cy.fixture("menu").as("menuFixture");
   cy.fixture("inventory").as("inventoryFixture");
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
      it("Opção About", () => {
         cy.get(MenuElements.buttonMenu)
         .click();
         
         cy.get(MenuElements.sidebarLinkAbout).click();

         cy.get("@menuFixture").then((menu) => {
            cy.get('.MuiBox-root')
               .should("contains.text", menu.about.textBody);
            cy.url().should('be.equal', URLS.MENU_ABOUT)
         });
      });

      it("Retornar após About", () => {

         cy.get(MenuElements.buttonMenu)
         .click();
         
         cy.get(MenuElements.sidebarLinkAbout).click();

         cy.url().should('be.equal', URLS.MENU_ABOUT);
         cy.go('back');
         cy.url().should('be.equal', URLS.HOME);

      });
   });

   describe("Logout", () => {
      it("Opção Logout", () => {

         cy.get(MenuElements.buttonMenu)
         .click();
         
         cy.get(MenuElements.sidebarLinkLogout).click();
         cy.url().should('be.equal', URLS.LOGIN);
        
      });

      it("Retornar após Logout", () => {

         cy.get(MenuElements.buttonMenu)
         .click();
         
         cy.get(MenuElements.sidebarLinkLogout).click();
         
         cy.go('back');
         cy.get(LoginElements.divErrorMessage)
            .should("be.visible")
            .and("contains.text", "Epic sadface: You can only access '/inventory.html' when you are logged in.");


      });
   });

   it("Reset App State", () => {

      cy.get(HomeElements.buttonAddCartBackpack).click();
      cy.get(HomeElements.buttonAddCartBikeLight).click();
      cy.get(HomeElements.buttonAddCartBoltTShirt).click();
      cy.get(HomeElements.buttonAddCartFleeceJacket).click();
      cy.get(HomeElements.buttonAddCartOnesie).click();
      cy.get(HomeElements.buttonAddCartTShirtRed).click();
      
      cy.get('@inventoryFixture').then((inventory) => {
          cy.get(HomeElements.cartBadge).should("have.text", inventory.produtos.length); 
      })

      cy.get(MenuElements.buttonMenu)
         .click();
      cy.get(MenuElements.sidebarLinkResetAppState).click();
      cy.get(HomeElements.cartBadge).should("not.exist");

   });

   it("All items", () => {
 
      cy.get(HomeElements.buttonCart).click();
      cy.url().should('contains', URLS.CART);
      
      cy.get(MenuElements.buttonMenu).click();
      cy.get(MenuElements.sidebarLinkInventory).click();
      cy.url().should('contains', URLS.HOME);

      
   });
});