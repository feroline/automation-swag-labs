const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    baseUrl: "https://www.saucedemo.com",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
