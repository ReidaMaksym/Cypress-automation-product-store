const { defineConfig } = require("cypress");

let products = []

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        setProducts: (product) => {
          return products.push(product)
        },

        getProducts: () => {
          return products
        }
      })
    },
  },
});
