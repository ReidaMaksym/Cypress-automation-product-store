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

Cypress.Commands.add('addProductToCart_Depricated', function(...productIndex){


    cy.intercept('GET', '/entries').as('mainPage')
    cy.wait('@mainPage')

    // let products = []
    let products
    
    let filePath = 'cypress/fixtures/testData.json'

    productIndex.forEach(element => {

        cy.get('#tbodyid > div').each(function($el, index, $list){
        
            if(index === element){
                
                cy.get($el.find('.card-title')).then(function(productName){
    
                    cy.get($el.find('h5')).then(function(productPrice){
                        
                        cy.get($el.find('.card-text')).then(function(productDescription){
    
                            // products.push({
                            //     productName: productName.text().trim(),
                            //     productPrice: productPrice.text().trim(),
                            //     productDescription: productDescription.text().trim()
                            // })

                            products = {
                                productName: productName.text().trim(),
                                productPrice: productPrice.text().trim(),
                                productDescription: productDescription.text().trim()
                            }
    
                        })
    
                    })
    
                }).then(function(){
                    console.log(products)
    
                    let setProduct
                    let addToFile = []
                    // let setProduct = []
    
                    cy.get($el.find('.card-title').children()).click()
    
                    cy.intercept('POST', '/view').as('productDetails')
    
                    cy.wait('@productDetails')
    
                    cy.get('@productDetails').then(function(productDetails){
                        console.log(productDetails)

                        // products.forEach(function(product){

                        //     console.log(product)

                        //     expect(product.productName).contains(productDetails.response.body.title)
                        //     expect(product.productPrice).contains(productDetails.response.body.price)
                        //     expect(productDetails.response.body.desc).contains(product.productDescription)

                        // })
    
                        // expect(products[0].productName).contains(productDetails.response.body.title)
                        // expect(products[0].productPrice).contains(productDetails.response.body.price)
                        // expect(productDetails.response.body.desc).contains(products[0].productDescription)

                        expect(products.productName).contains(productDetails.response.body.title)
                        expect(products.productPrice).contains(productDetails.response.body.price)
                        expect(productDetails.response.body.desc).contains(products.productDescription)
    
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
    
                            // setProduct.push({
                            //     productTitle: productDetails.response.body.title,
                            //     productPrice: productDetails.response.body.price,
                            //     productDetails: productDetails.response.body.desc
                            // })
    
                            // cy.task('setProducts', setProduct)
    
                            // addToFile.push(setProduct)
    
                            // cy.writeFile('cypress/fixtures/testData.json', setProduct, {flag: 'a+'})
    
                            cy.readFile('cypress/fixtures/testData.json', null).then(function(fileData){
    
                                // if(fileData.length === 0){
                                //     // fileData = setProduct
                                //     fileData = new Array()
                                //     fileData.push(setProduct)
                                // } else{
                                //     fileData = new Array()
                                //     fileData.push(setProduct)
                                // }
                                // fileData = 
                                // fileData = []
                                console.log('+++++++++++++++++++++++++++')
                                console.log(fileData)
    
                                if( !Array.isArray(fileData) ){
                                    fileData = new Array()
                                }
    
                                
    
    
                                console.log(fileData)
                                // fileData.push(setProduct)
                                // addToFile.push(fileData)
    
                                // addToFile.push(setProduct)
    
                                // fileData = addToFile
                                fileData.push(setProduct)
    
                                // fileData = setProduct
                                cy.writeFile('cypress/fixtures/testData.json', fileData, {flag: 'a+'})
                            })
    
                            // setProduct.push({
                            //     productTitle: productDetails.response.body.title,
                            //     productPrice: productDetails.response.body.price,
                            //     productDetails: productDetails.response.body.desc
                            // })
    
                            // cy.wrap(setProduct).as('setProduct')
                        })
    
                    }).then(function(){
    
                        cy.intercept('POST', '/addtocart').as('addToCart')
    
                        cy.get('.btn.btn-lg.btn-success').click()
    
                        cy.wait('@addToCart')
    
                        cy.get('@addToCart').then(function(addToCart){
    
                            console.log(addToCart)
                            expect(addToCart.response.statusCode).eq(200)
    
                        }).then(function(){
                            cy.visit('https://www.demoblaze.com/index.html')
                        })
    
                    })
                  
                })
    
            }
    
        })
        
    });

    // for(let i = 0; i < productIndex.length; i++){

    // }



})

Cypress.Commands.add('addProductToCart', function(...productIndex){

    cy.intercept('GET', '**/entries').as('mainPage')
    cy.intercept('POST', '**/view').as('productDetails')
    cy.intercept('POST', '**/addtocart').as('addToCart')

    cy.wait('@mainPage')

    let products = []
    
    let product

    productIndex.forEach(function(productIndex){

        cy.get('#tbodyid > div').each(function($el, index, $list){

            // productIndex.forEach(function(productIndex){
    
                if(index === productIndex){
    
                    cy.get($el.find('.card-title')).then(function(productName){
        
                        cy.get($el.find('h5')).then(function(productPrice){
        
                            cy.get($el.find('.card-text')).then(function(productDescription){
        
                                products.push({
                                    productName: productName.text().trim(),
                                    productPrice: productPrice.text().trim(),
                                    productDescription: productDescription.text().trim()
                                })
    
                                product = {
                                    productName: productName.text().trim(),
                                    productPrice: productPrice.text().trim(),
                                    productDescription: productDescription.text().trim()
                                }
    
                            })
        
                        })
        
                    })
    
                    // cy.wait(6000)
    
                    console.log($el.find('.card-title').text())
    
                    cy.get($el.find('.card-title').children()).click()
    
                    // cy.intercept('POST', '**/view').as('productDetails')
        
                    cy.wait('@productDetails')
    
                    cy.get('@productDetails').then(function(productDetails){
    
                        console.log(productDetails)
                        console.log(product)

                        // cy.wait(6000)
    
                        expect(product.productName).contains(productDetails.response.body.title)
                        expect(product.productPrice).contains(productDetails.response.body.price)
                        expect(productDetails.response.body.desc).contains(product.productDescription)

                        
                        cy.get('div#tbodyid > .name').then(function(productDetailsTitle){
    
                            cy.get('div#tbodyid > .price-container').then(function(productDetailsPrice){
    
                                cy.get('div#more-information > p').then(function(productDetailsDescription){
                                    
                                    expect(productDetails.response.body.title).contains(productDetailsTitle.text().trim())
                                    expect(productDetailsPrice.text().trim()).contains(productDetails.response.body.price)
                                    expect(productDetails.response.body.desc).contains(productDetailsDescription.text().trim())
    
                                })
    
                            })
    
                        })
    
                    })

                    // cy.intercept('POST', '**/addtocart').as('addToCart')
    
                    cy.get('.btn.btn-lg.btn-success').click()

                    cy.wait('@addToCart')

                    cy.get('@addToCart').then(function(addToCart){

                        // console.log(addToCart)
                        expect(addToCart.response.statusCode).eq(200)

                    })
    
                    cy.get('a#nava').click()
    
                    // cy.visit('https://www.demoblaze.com/index.html')
    
    
                    
                }
    
            // })
    
        }).then(function(){
            // console.log(products)

            // cy.writeFile('cypress/fixtures/testData.json', products, {flag: 'a+'})
            cy.writeFile('cypress/fixtures/testData.json', products)

        })


    })


})


Cypress.Commands.add('isCartEmpty', function(){

    // cy.intercept('POST', '**/viewcart').as('viewCart')

    cy.get('body').then(function(body){

        // cy.wait('@viewCart')

        if( body.find('tr > td:nth-of-type(4) > a').length === 0){
            console.log('NO ITEMS IN CART')
            // return cy.wrap(true) 
            return cy.wrap({
                isEmpty: true,
                length: body.find('tr > td:nth-of-type(4) > a').length
            })
        }
        else{
            console.log('THERE ARE SOME ITEMS IN CART')
            // return cy.wrap(false)
            return cy.wrap({
                isEmpty: false,
                length: body.find('tr > td:nth-of-type(4) > a').length,
                items: cy.get('tr > td:nth-of-type(4) > a')
            })
        }

    })
})


Cypress.Commands.add('deleteAllItemsFromCart', function(){

    let itemsToDelete = []

    cy.isCartEmpty().then(function(cartData){

        if(cartData.isEmpty === false){

            cy.get('tr > td:nth-of-type(4) > a').each(function($el, index, $list){

                itemsToDelete.push($el)
        
            }).then(function(){
                if(itemsToDelete.length >= 1){
                    cy.get(itemsToDelete[0]).click()
                    cy.wait(2000)
        
                    cy.deleteAllItemsFromCart()
                }
            })

        }

    })



})