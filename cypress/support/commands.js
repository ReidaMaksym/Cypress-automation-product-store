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

Cypress.Commands.add('addProductToCart', function(productIndex){

    let products = []

    cy.get('#tbodyid > div').each(function($el, index, $list){
        
        if(index === productIndex){
            
            cy.get($el.find('.card-title')).then(function(productName){

                cy.get($el.find('h5')).then(function(productPrice){
                    
                    cy.get($el.find('.card-text')).then(function(productDescription){

                        products.push({
                            productName: productName.text().trim(),
                            productPrice: productPrice.text().trim(),
                            productDescription: productDescription.text().trim()
                        })

                    })

                })

            }).then(function(){
                console.log(products)

                let setProduct

                cy.get($el.find('.card-title').children()).click()

                cy.intercept('POST', '/view').as('productDetails')

                cy.wait('@productDetails')

                cy.get('@productDetails').then(function(productDetails){
                    console.log(productDetails)

                    expect(products[0].productName).contains(productDetails.response.body.title)
                    expect(products[0].productPrice).contains(productDetails.response.body.price)
                    expect(productDetails.response.body.desc).contains(products[0].productDescription)

                    cy.get('div#tbodyid > .name').then(function(productDetailsTitle){

                        cy.get('div#tbodyid > .price-container').then(function(productDetailsPrice){

                            cy.get('div#more-information > p').then(function(productDetailsDescription){
                                
                                expect(productDetails.response.body.title).contains(productDetailsTitle.text().trim())
                                expect(productDetailsPrice.text().trim()).contains(productDetails.response.body.price)
                                expect(productDetails.response.body.desc).contains(productDetailsDescription.text().trim())

                            })

                        })

                    }).then(function(){

                        setProduct = {
                            productTitle: productDetails.response.body.title,
                            productPrice: productDetails.response.body.price,
                            productDetails: productDetails.response.body.desc
                        }

                        cy.task('setProducts', setProduct)
                    })

                }).then(function(){

                    cy.intercept('POST', '/addtocart').as('addToCart')

                    cy.get('.btn.btn-lg.btn-success').click()

                    cy.wait('@addToCart')

                    cy.get('@addToCart').then(function(addToCart){

                        console.log(addToCart)
                        expect(addToCart.response.statusCode).eq(200)

                    })

                })
              
            })

        }

    })

})