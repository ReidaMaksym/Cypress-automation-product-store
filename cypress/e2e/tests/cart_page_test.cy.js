/// <reference types="cypress" />

import cartPage from '../pages/cart_page'
import mainShopPage from '../pages/main_shop_page'

describe('Cart page test', function(){

    this.beforeEach(function(){
        mainShopPage
            .visitMainPage()
    
        cy.addProductToCart(5)
    })

    it('', function(){
        cartPage
            .visitCartPage()
            .checkCart()
    })

})