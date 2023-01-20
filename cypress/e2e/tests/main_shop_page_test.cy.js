/// <reference types="cypress" />

import mainShopPage from '../pages/main_shop_page'


describe('Main shop page testing', function(){

    it('', function(){

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

    it.only('Check categories', function(){
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

})
