/// <reference types="cypress" />
import {placeOrderData} from '../../fixtures/inputData'

const cartPageLocators = {
    placeOrderBtn: '.btn.btn-success',
    placeOrderModal: 'div#orderModal',
    nameInput: 'input#name',
    countryInput: 'input#country',
    cityInput: 'input#city',
    creditCardInput: 'input#card',
    monthInput: 'input#month',
    yearInput: 'input#year',
    purchhaseBtn: "div#orderModal > div[role='document'] .btn.btn-primary",
    successMessage: '.showSweetAlert.sweet-alert.visible > h2'
}

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

            const {
                response: {
                    body: {
                        Items
                    }
                }
            } = cartDetails

            console.log(Items)

            // for(let i = 0; i < cartDetails.response.body.Items; i++){
            //     console.log(cartDetails.response.body.Items[i].prod_id)

            //     productIds.push(cartDetails.response.body.Items[i].prod_id)
            // }

            Items.forEach(element => {

                console.log(element.prod_id)
                productIds.push(element.prod_id)

            });

        }).then(function(){
            console.log(productIds)

            cy.wrap(productIds).as('productIds')
        })


        // cy.wait('@viewProduct')

        // cy.get('@viewProduct').then(function(prodducts){

        //     console.log(prodducts)

        // })

        cy.get('@productIds').then(function(ids){

            if(ids.length !== 0){

                cy.wait('@viewProduct')

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

            }




        })


        return this
    }

    deleteItemFromCart({deleAllProducts = false, productIndexToDelete}){

        if(deleAllProducts === true && productIndexToDelete === -1){

            cy.isCartEmpty().then(function(cartData){

                console.log(cartData)
                if(cartData.isEmpty === false){

                    console.log('+++++++++++++++++++')

                    console.log(cartData.items)

                    cy.deleteAllItemsFromCart()

                }

            })

        }
        else if(deleAllProducts === false){
            
            cy.get('tr > td:nth-of-type(4) > a').each(function($el, index, $list){

                console.log('1111111111111111--------------')

                if(index === productIndexToDelete){
                    cy.get($el).click()
                }
        
            })

        }

        return this
    }

    openPlaceOrderModal(){

        cy.wait('@viewCart')
        cy.wait('@viewProduct')
        
        cy.get(cartPageLocators.placeOrderBtn).click()
        cy.get(cartPageLocators.placeOrderModal).should('have.class', 'show')
        return this
    }

    fillName(name){

        cy.get(cartPageLocators.nameInput)
            .click()
            .clear()
            .type(name)

        return this

    }

    fillCountry(country){

        cy.get(cartPageLocators.countryInput)
            .click()
            .clear()
            .type(country)

        return this

    }

    fillCity(city){

        cy.get(cartPageLocators.cityInput)
            .click()
            .clear()
            .type(city)

        return this

    }

    fillCreditCard(creditCard){

        cy.get(cartPageLocators.creditCardInput)
            .click()
            .clear()
            .type(creditCard)

        return this

    }

    fillMonth(month){

        cy.get(cartPageLocators.monthInput)
            .click()
            .clear()
            .type(month)

        return this    
    }

    fillYear(year){

        cy.get(cartPageLocators.yearInput)
            .click()
            .clear()
            .type(year)

        return this    

    }

    purchhaseBtnClick(){

        cy.get(cartPageLocators.purchhaseBtn)
            .click()
        
        cy.wait(2000)
        
        cy.get(cartPageLocators.successMessage).then(function(message){
            expect(message.text()).contains(placeOrderData.successMessage)
        })
        
        return this    

    }

}

module.exports = new cartPage()