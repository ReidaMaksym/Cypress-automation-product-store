/// <reference types="cypress" />

class cartPage {

    visitCartPage(){

        cy.visit('https://www.demoblaze.com/cart.html')
        return this

    }

    checkCart(){

        let productIds = []

        cy.intercept('POST', '/viewcart').as('viewCart')

        cy.intercept('POST', '/view').as('viewProduct')

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

            cy.task('getProducts').then(function(prodducts){

                console.log(prodducts)

                console.log(cartProducts)

            })

            // cy.get('@setProduct').then(function(test){
            //     console.log(test)

            //     console.log(cartProducts)
            // })

        })


        return this
    }
}

module.exports = new cartPage()