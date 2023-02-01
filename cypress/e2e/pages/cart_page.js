/// <reference types="cypress" />

class cartPage {

    visitCartPage(){

        cy.visit('https://www.demoblaze.com/cart.html')
        return this

    }

    checkCart(){

        let productIds = []

        cy.intercept('POST', '**/viewcart').as('viewCart')

        cy.intercept('POST', '**/view').as('viewProduct')

        cy.wait('@viewCart')

        cy.get('@viewCart').then(function(cartDetails){

            console.log(cartDetails)

            // for(let i = 0; i < cartDetails.response.body.Items; i++){
            //     console.log(cartDetails.response.body.Items[i].prod_id)

            //     productIds.push(cartDetails.response.body.Items[i].prod_id)
            // }

            cartDetails.response.body.Items.forEach(element => {

                console.log(element.prod_id)
                productIds.push(element.prod_id)

            });

        }).then(function(){
            console.log(productIds)

            cy.wrap(productIds).as('productIds')
        })

        cy.wait('@viewProduct')

        // cy.get('@viewProduct').then(function(prodducts){

        //     console.log(prodducts)

        // })

        cy.get('@productIds').then(function(ids){
            console.log(ids)

            let cartProducts = []

            ids.forEach(function(id){

                cy.request({

                    method: 'POST',
                    url: 'https://api.demoblaze.com/view',
                    body: {
                        id: id 
                    }

                }).then(function(response){

                    console.log(response)

                    cartProducts.push({
                        productTitle: response.body.title,
                        productPrice: response.body.price,
                        productDescription: response.body.desc
                    })

                })

            })


            cy.readFile('cypress/fixtures/testData.json').then(function(fileData){

                let sortedFileData = fileData.sort(
                    (p1, p2) => (p1.productPrice < p2.productPrice) ? 1 : (p1.productPrice > p2.productPrice) ? -1 : 0
                )

                let sortedCartProducts = cartProducts.sort(
                    (p1, p2) => (p1.productPrice < p2.productPrice) ? 1 : (p1.productPrice > p2.productPrice) ? -1 : 0
                )

                for(let i = 0; i < cartProducts.length; i++){

                    expect(sortedFileData[i].productName).contains(sortedCartProducts[i].productTitle)
                    expect(sortedFileData[i].productPrice).contains(sortedCartProducts[i].productPrice)
                    expect(sortedCartProducts[i].productDescription).contains(sortedFileData[i].productDescription)
                    
                }

            })


        })


        return this
    }
}

module.exports = new cartPage()