describe('Add item to shopping cart', () => {
    beforeEach('Must log in to the website' ,() => {
        cy.visit('https://qa-practice.netlify.app/auth_ecommerce')

        cy.fixture('credential').then((data) => {
            cy.login(data.email, data.password)
            cy.get("ul.nav>li.nav-item.lgout>a#logout", {setTimeout : 5000}).then(() => {
                cy.log('LOG IN SUCCESSFULL')
            })
        })
    })

    it('Add single item to shopping cart', () => {
        //Add single item to the shopping cart
        cy.get(":nth-child(1) > .shop-item-details > .btn", {setTimeout : 5000}).click()
    })

    

    it('Add Multiple item to shopping cart', () => {
        //add each available item to shopping cart
        cy.get(".shop-items>.shop-item").each(($el, index) => {
            const numIndex = index + 1
            cy.get(":nth-child(" + numIndex + ") > .shop-item-details > .btn", {setTimeout : 5000}).click()      
        })         
    })

})

describe('Remove item from shopping cart', () => {
    beforeEach('Must log in to the website' ,() => {
        cy.visit('https://qa-practice.netlify.app/auth_ecommerce')

        cy.fixture('credential').then((data) => {
            cy.login(data.email, data.password)
            cy.get("ul.nav>li.nav-item.lgout>a#logout", {setTimeout : 5000}).then(() => {
                cy.log('LOG IN SUCCESSFULL')
            })
        })
    })

    it('Remove single item from shopping cart with condition of only 1 item on the cart', () => {
        //Add single item to the shopping cart
        cy.get(":nth-child(1) > .shop-item-details > .btn", {setTimeout : 5000}).click()

        //Remove the item from shopping cart
        cy.get(".cart-items>.cart-row").each(($el, index) => {
            const numIndex = index + 1
            cy.get(".cart-items > :nth-child("+ numIndex +")> .cart-quantity > .btn.btn-danger", {setTimeout : 5000}).click()
            cy.log ("SUCCESSFULLY REMOVING ITEM NUMBER "+ numIndex)  
        })

        // make sure that item in the cart is empty
        cy.get(".cart-items>.cart-row").should('not.exist')
    })

    it('Remove single item from shopping cart with condition of multiple item is on the cart', () => {
        //Add 3 items to shopping cart
        cy.get(":nth-child(1) > .shop-item-details > .btn", {setTimeout : 5000}).click()
        cy.get(":nth-child(2) > .shop-item-details > .btn", {setTimeout : 5000}).click()
        cy.get(":nth-child(3) > .shop-item-details > .btn", {setTimeout : 5000}).click()

        //Remove 2nd item from shopping cart
        cy.get(".cart-items>.cart-row").each(($el, index, $list) => {
            const numIndex = index + 1
            if(numIndex == 2){
                cy.get(".cart-items > :nth-child("+ numIndex +")> .cart-quantity > .btn.btn-danger", {setTimeout : 5000}).click()
                cy.get(".cart-items > :nth-child(" + numIndex + ") > .cart-item > .cart-item-title").invoke('text').then((res) => {
                    cy.log(res + " SUCCESSFULLY REMOVED FROM CART")
                })
            }
            
        })

        // make sure that cart is not empty
        cy.get(".cart-items>.cart-row").should('exist')
    })

    it('Remove all items from shopping cart', () => {
        //Add all item to the shopping cart
        cy.get(":nth-child(1) > .shop-item-details > .btn", {setTimeout : 5000}).click()
        cy.get(":nth-child(2) > .shop-item-details > .btn", {setTimeout : 5000}).click()
        cy.get(":nth-child(3) > .shop-item-details > .btn", {setTimeout : 5000}).click()
        cy.get(":nth-child(4) > .shop-item-details > .btn", {setTimeout : 5000}).click()
        cy.get(":nth-child(5) > .shop-item-details > .btn", {setTimeout : 5000}).click()

        //Start removing each item from shopping cart
        cy.get(".cart-items>.cart-row").each(($el, index) => {
            const numIndex = index + 1
            cy.get(".cart-items > :nth-child(1)> .cart-quantity > .btn.btn-danger", {setTimeout : 5000}).click()
            cy.log ("SUCCESSFULLY REMOVING ITEM NUMBER "+ numIndex)
            
        })

        // make sure that item in the cart is empty
        cy.get(".cart-items>.cart-row").should('not.exist')
    })
})