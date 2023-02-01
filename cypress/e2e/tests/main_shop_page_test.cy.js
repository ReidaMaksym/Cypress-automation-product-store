/// <reference types="cypress" />

import mainShopPage from '../pages/main_shop_page'


describe('Main shop page testing', function(){

    it.only('', function(){

        mainShopPage
            .visitMainPage()
            .checkProductsList()
            // .checkPagination()
            .nextButtonClick()
            .checkPagination()
            .previousButtonClick()
            .checkPagination()
            // .nextButtonClick()
    })

    it('Check categories', function(){
        mainShopPage
            .visitMainPage()
            .checkCategoty('Phones')
            .nextButtonClick()
            .checkPagination()
            // .checkCategoty('Laptops')
            // .nextButtonClick()
            // .checkPagination()
            // .checkCategoty('Monitors')
            // .nextButtonClick()
            // .checkPagination()
    })

    it('Add product to cart', function(){
        mainShopPage
            .visitMainPage()
        
        cy.addProductToCart(5)
    })


})
