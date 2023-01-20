// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('getElementAttribute', function(locator, attributeName){
    cy.get(locator).invoke('attr', attributeName).then(function(attribute){
        console.log(attribute)
        return attribute
    })
})


Cypress.Commands.add('getProducts', function(){
    // cy.intercept('GET', '/entries').as('mainPage')
    // cy.wait('@mainPage')

    // cy.get('@mainPage').then(function(response){

    // })
    let productsList = []

    // console.log(response)

    cy.get('#tbodyid > div').each(function($el, index, $list){

        cy.get($el.find('.card-title')).then(function(productName){
            // console.log(productName.text())
            cy.get($el.find('h5')).then(function(price){

                cy.get($el.find('.card-text')).then(function(description){

                    productsList.push({

                        productName: productName.text(),
                        productPrice: price.text(),
                        productDescription: description.text()

                    })

                })

            })

        })

    }).then(function(){

        // console.log(productsList)

        return cy.wrap(productsList)

        // for(let i = 0; i < productsList.length; i++){
        //     expect(productsList[i].productName).contains(response.body.Items[i].title)
        //     expect(productsList[i].productDescription).contains(response.body.Items[i].desc)
        //     expect(productsList[i].productPrice).contains(response.body.Items[i].price)
        // }



    })
})


Cypress.Commands.add('isButtonVisible', function(locator){

    cy.getElementAttribute(locator, 'style').then(function(attributeValue){
        
        // return  attribute === 'display: none' ? false : true

        // console.log(attributeValue)

        if(attributeValue === 'display: none;'){
            console.log("The button is NOT visible")
            return false
        } 
        else{
            console.log("The button IS visible")
            return true
        }
    })

})