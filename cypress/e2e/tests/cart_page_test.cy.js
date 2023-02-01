/// <reference types="cypress" />

import cartPage from '../pages/cart_page'
import mainShopPage from '../pages/main_shop_page'

describe('Cart page test', function(){

    this.beforeEach(function(){

        cy.writeFile('cypress/fixtures/testData.json', '')

        mainShopPage
            .visitMainPage()
    
        cy.addProductToCart(1, 2, 3, 4, 5)

    })

    it('', function(){

        cartPage
            .visitCartPage()
            .checkCart()


    })

})