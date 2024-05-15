const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "h2v9oq",
  e2e: {
    chromeWebSecurity: false,
    baseUrl: "https://www.saucedemo.com",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

