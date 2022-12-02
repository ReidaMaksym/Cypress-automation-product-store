/// <reference types="cypress" />


class mainShopPage {

    mainShopPageLocators = {

        

    }

    visitMainPage(){

        cy.visit('https://www.demoblaze.com/index.html')

        return this

    }

    checkProductsList(){

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

}

module.exports = new mainShopPage()