const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "9edqig",
  e2e: {
    chromeWebSecurity: false,
    baseUrl: "https://www.saucedemo.com",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

