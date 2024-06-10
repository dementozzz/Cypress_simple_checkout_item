describe('Successfully Login', () => {
    it('Login to the website using valid credential', () => {
      cy.visit('https://qa-practice.netlify.app/auth_ecommerce')

      cy.fixture('credential').then((data) => {
        cy.login(data.email, data.password)
        cy.get("ul.nav>li.nav-item.lgout>a#logout", {setTimeout : 5000}).should('be.visible')
      })
          
    })
})

describe('Attempt to failed login', () => {
    it('Should not logged in using invalid credential', () => {
      cy.visit('https://qa-practice.netlify.app/auth_ecommerce')

      cy.login("Rio_ferdinan@gmail.com","vlks3345")
      cy.get("div.alert#message", {setTimeout : 5000}).contains("Bad credentials! Please try again! Make sure that you've registered.")
    })
})