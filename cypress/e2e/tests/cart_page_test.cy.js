/// <reference types="cypress" />

import cartPage from '../pages/cart_page'
import mainShopPage from '../pages/main_shop_page'
import {placeOrderData} from '../../fixtures/inputData'

describe('Cart page test', function(){

    this.beforeEach(function(){

        cy.writeFile('cypress/fixtures/testData.json', '')

        mainShopPage
            .visitMainPage()
    
        cy.addProductToCart(1, 2, 3)
        // cy.addProductToCart(1, 2)

    })

    it('', function(){

        cartPage
            .visitCartPage()
            .checkCart()
            // .deleteItemFromCart(true, 0)
            .deleteItemFromCart({
            
                productIndexToDelete: 0
            })
            // .deleteItemFromCart(false, 3)


    })

    it.only('', function(){

        cartPage
            .visitCartPage()
            .checkCart()
            .deleteItemFromCart({
                deleAllProducts: true,
                productIndexToDelete: -1
            })
            // .openPlaceOrderModal()
            // .fillName(placeOrderData.name)
            // .fillCountry(placeOrderData.country)
            // .fillCity(placeOrderData.city)
            // .fillCreditCard(placeOrderData.creditCard)
            // .fillMonth(placeOrderData.month)
            // .fillYear(placeOrderData.year)
            // .purchhaseBtnClick()

    })

})