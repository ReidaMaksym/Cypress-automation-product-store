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
            // .nextButtonClick()
    })

})
