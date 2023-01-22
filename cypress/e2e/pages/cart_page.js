/// <reference types="cypress" />

class cartPage {

    visitCartPage(){

        cy.visit('https://www.demoblaze.com/cart.html')
        return this

    }

    checkCart(){

        cy.intercept('POST', '/viewcart').as('viewCart')

        cy.wait('@viewCart')

        cy.get('@viewCart').then(function(cartDetails){

            console.log(cartDetails)

        })

        return this
    }
}

module.exports = new cartPage()