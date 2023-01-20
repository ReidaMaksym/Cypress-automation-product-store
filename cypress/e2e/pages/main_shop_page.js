/// <reference types="cypress" />


class mainShopPage {

    mainShopPageLocators = {

        nextButton: 'form#frm > ul > li:nth-of-type(2) > .page-link',
        previousButton: 'form#frm > ul > li:nth-of-type(1) > .page-link'

    }

    visitMainPage(){

        cy.visit('https://www.demoblaze.com/index.html')

        return this

    }

    checkProductsList(){

        cy.intercept('GET', '/entries').as('mainPage')
        cy.wait('@mainPage')

        cy.request({
            method: 'GET',
            url: 'https://api.demoblaze.com/entries'
        }).then(function(responce){

            let productsList = []

            cy.get('#tbodyid > div').each(function($el, index, $list){

                cy.get($el.find('.card-title')).then(function(productName){
                    // console.log(productName.text())
                    cy.get($el.find('h5')).then(function(price){

                        cy.get($el.find('.card-text')).then(function(description){

                            productsList.push({

                                productName: productName.text(),
                                productPrice: price.text(),
                                productDescription: description.text()

                            })

                        })

                    })

                })

            }).then(function(){

                for(let i = 0; i < productsList.length; i++){
                    expect(productsList[i].productName).contains(responce.body.Items[i].title)
                    expect(productsList[i].productDescription).contains(responce.body.Items[i].desc)
                    expect(productsList[i].productPrice).contains(responce.body.Items[i].price)
                }

            })

        })

        return this
    }

    checkPagination(){

        cy.get('@pagination').then(function(response){
            console.log(response)
            // response.body.Items

            cy.getProducts().then(function(products){
                console.log(products)


                for(let i = 0; i < response.response.body.Items.length; i++){

                    expect(products[i].productDescription).contains(response.response.body.Items[i].desc)
                    expect(products[i].productName).contains(response.response.body.Items[i].title)
                    expect(products[i].productPrice).contains(response.response.body.Items[i].price)
                }

            })
        })

        cy.isButtonVisible(this.mainShopPageLocators.nextButton).then(function(isVisible){
            console.log(isVisible)
        })

        return this
    }

    nextButtonClick(){
        cy.get(this.mainShopPageLocators.nextButton)
            .should('contain', 'Next') 
            .click()
        
        cy.intercept('POST', '/pagination').as('pagination')

        cy.wait('@pagination')

        
        
        return this
    }

}

module.exports = new mainShopPage()