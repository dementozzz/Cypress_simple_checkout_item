describe('Checkout items', () => {
    beforeEach('Must log in to the website' ,() => {
        cy.visit('https://qa-practice.netlify.app/auth_ecommerce')

        cy.fixture('credential').then((data) => {
            cy.login(data.email, data.password)
            cy.get("ul.nav>li.nav-item.lgout>a#logout", {setTimeout : 5000}).then(() => {
                cy.log('LOG IN SUCCESSFULL')
            })
        })
    })

    it('try checkout successfully', () => {
        //select 2 item to be added to cart
        cy.get(":nth-child(1) > .shop-item-details > .btn", {setTimeout : 5000}).click()
        cy.get(":nth-child(3) > .shop-item-details > .btn", {setTimeout : 5000}).click()

        //proceed to shipping form
        cy.get(".btn-purchase").click()

        //make sure to fill the shipping info
        cy.get("input#phone").clear().type("63533120")
        cy.get("input[name='street']").clear().type("211 Lorong 8 Toa Payoh")
        cy.get("input[name='city']").clear().type("Singapore")
        cy.get("#countries_dropdown_menu").select('Singapore')

        //proceed to submit the list item and shipping info
        cy.get("#submitOrderBtn").click()

        /*
            since "#message" element is present in shipping form page and success purchase page, the only thing we have to check is the text inside the element. 
            In this case, we make sure that "#message" element contain text that indicate the purchase is successfully completed
        */
        cy.get("#message").should('exist')
    })

    it('Checkout with no item in shopping cart', () => {
        //proceed to shipping form
        cy.get(".btn-purchase").click()

        //make sure clear all input text
        cy.get("input#phone").clear().type("63533120")
        cy.get("input[name='street']").clear().type("211 Lorong 8 Toa Payoh")
        cy.get("input[name='city']").clear().type("Singapore")
        cy.get("#countries_dropdown_menu").select('Singapore')

        //proceed to submit the list item and shipping info
        cy.get("#submitOrderBtn").click()


        /*
            since "#message" element is present in shipping form page and success purchase page, the only thing we have to check is the text inside the element. 
            In this case, we make sure that "#message" element did not contain any text / empty that indicate the purchase is failed 
        */
        cy.get("#message").should('be.empty')
    })
})

describe('Shipping form', () => {
    beforeEach('Must log in to the website' ,() => {
        cy.visit('https://qa-practice.netlify.app/auth_ecommerce')

        cy.fixture('credential').then((data) => {
            cy.login(data.email, data.password)
            cy.get("ul.nav>li.nav-item.lgout>a#logout", {setTimeout : 5000}).then(() => {
                cy.log('LOG IN SUCCESSFULL')
            })
        })
    })


    it('Checkout an items without fill any shipping info (should not redirect to success purchase page)', () => {
        //select 2 item to be added to cart
        cy.get(":nth-child(1) > .shop-item-details > .btn", {setTimeout : 5000}).click()
        cy.get(":nth-child(3) > .shop-item-details > .btn", {setTimeout : 5000}).click()

        //proceed to shipping form
        cy.get(".btn-purchase").click()

        //make sure clear all input text
        cy.get("input#phone").clear()
        cy.get("input[name='street']").clear()
        cy.get("input[name='city']").clear()
        cy.get("#countries_dropdown_menu").select(0)

        //proceed to submit the list item and shipping info
        cy.get("#submitOrderBtn").click()

        /*
            since "#message" element is present in shipping form page and success purchase page, the only thing we have to check is the text inside the element. 
            In this case, we make sure that "#message" element did not contain any text / empty that indicate the purchase is failed 
        */
        cy.get("#message").should('have.value', '')
    })

    it('Without city (should not redirect to success purchase page)', () => {
        //select 2 item to be added to cart
        cy.get(":nth-child(1) > .shop-item-details > .btn", {setTimeout : 5000}).click()
        cy.get(":nth-child(3) > .shop-item-details > .btn", {setTimeout : 5000}).click()

        //proceed to shipping form
        cy.get(".btn-purchase").click()

        //Fill the shipping info except "City"
        cy.get("input#phone").clear().type("63533120")
        cy.get("input[name='street']").clear().type("211 Lorong 8 Toa Payoh")
        cy.get("input[name='city']").clear()
        cy.get("#countries_dropdown_menu").select('Singapore')

        //proceed to submit the list item and shipping info
        cy.get("#submitOrderBtn").click()

        /*
            since "#message" element is present in shipping form page and success purchase page, the only thing we have to check is the text inside the element. 
            In this case, we make sure that "#message" element did not contain any text / empty that indicate the purchase is failed 
        */
        cy.get("#message").should('have.value', '')
    })

    it('Without street (should not redirect to success purchase page)', () => {
        //select 2 item to be added to cart
        cy.get(":nth-child(1) > .shop-item-details > .btn", {setTimeout : 5000}).click()
        cy.get(":nth-child(3) > .shop-item-details > .btn", {setTimeout : 5000}).click()

        //proceed to shipping form
        cy.get(".btn-purchase").click()

        //Fill the shipping info except "Street"
        cy.get("input#phone").clear().type("63533120")
        cy.get("input[name='street']").clear()
        cy.get("input[name='city']").clear().type("Singapore")
        cy.get("#countries_dropdown_menu").select('Singapore')

        //proceed to submit the list item and shipping info
        cy.get("#submitOrderBtn").click()

        /*
            since "#message" element is present in shipping form page and success purchase page, the only thing we have to check is the text inside the element. 
            In this case, we make sure that "#message" element did not contain any text / empty that indicate the purchase is failed 
        */
        cy.get("#message").should('have.value', '')
    })

    it('Phone number should not contain alphabet', () => {
        //proceed to shipping form
        cy.get(".btn-purchase").click()

        cy.get("input#phone").clear().type("63533120asda").invoke('val').should(value => {
            //Since "phone" input contain number & alphabet, this is should be marked as failed
            expect(Number.isNaN(+value), 'input should be a number').to.eq(false)
        })
    })

    it('Without phone number (should not redirect to success purchase page)', () => {
        //select 2 item to be added to cart
        cy.get(":nth-child(1) > .shop-item-details > .btn", {setTimeout : 5000}).click()
        cy.get(":nth-child(3) > .shop-item-details > .btn", {setTimeout : 5000}).click()

        //proceed to shipping form
        cy.get(".btn-purchase").click()

        //Fill the shipping info except "Phone"
        cy.get("input#phone").clear()
        cy.get("input[name='street']").clear().type("211 Lorong 8 Toa Payoh")
        cy.get("input[name='city']").clear().type("Singapore")
        cy.get("#countries_dropdown_menu").select('Singapore')

        //proceed to submit the list item and shipping info
        cy.get("#submitOrderBtn").click()

        /*
            since "#message" element is present in shipping form page and success purchase page, the only thing we have to check is the text inside the element. 
            In this case, we make sure that "#message" element did not contain any text / empty that indicate the purchase is failed 
        */
        cy.get("#message").should('have.value', '')
    })

    it('Without region (should not redirect to success purchase page)', () => {
        //select 2 item to be added to cart
        cy.get(":nth-child(1) > .shop-item-details > .btn", {setTimeout : 5000}).click()
        cy.get(":nth-child(3) > .shop-item-details > .btn", {setTimeout : 5000}).click()

        //proceed to shipping form
        cy.get(".btn-purchase").click()

        //Fill the shipping info except "Region"
        cy.get("input#phone").clear().type("63533120")
        cy.get("input[name='street']").clear().type("211 Lorong 8 Toa Payoh")
        cy.get("input[name='city']").clear().type("Singapore")
        cy.get("#countries_dropdown_menu").select(0)

        //proceed to submit the list item and shipping info
        cy.get("#submitOrderBtn").click()

        /*
            since "#message" element is present in shipping form page and success purchase page, the only thing we have to check is the text inside the element. 
            In this case, we make sure that "#message" element did not contain any text / empty that indicate the purchase is failed 
        */
        cy.get("#message").should('be.empty')
    })
})