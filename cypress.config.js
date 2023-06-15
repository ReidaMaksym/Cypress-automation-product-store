const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

let products = []

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here


      
      // on('after:spec', (details) => {

      //   products = []
      //   return details;

      // })
    

      on('task', {
        setProducts: (product) => {
          return products.push(product)
        },

        getProducts: () => {
          return products
        }
        
      })

      // allureWriter(on, config)
      // return config


    },
  },
  video: false
});
