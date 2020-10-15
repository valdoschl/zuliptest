describe('tests', () => {
    const user = Cypress.env('user')
    const pass = Cypress.env('pass')
    const url = Cypress.env('url')
    const stream = Cypress.env('stream')

    before(() => {
        cy.clearCookies()
    })

    beforeEach(() => {
        // Preserve cookie in every test
        Cypress.Cookies.defaults({
          preserve: (cookie) => {
            return true;
          }
        })
    });

    it('Log in', () => {
        cy.visit(url)
        cy.url().should('include','/login')
        cy.get('input#id_username')
            .type(user)
            .should('have.value', user)
        cy.get('input#id_password')
            .type(pass, { log: false })
            .should('have.value', pass)
        cy.get('button[type=submit]').click()
        cy.url().should('eq',url)
    })
    
    it('Write to stream', () => {
        //Open stream
        cy.get(`#stream_filters > li > div > div > a:contains(${stream})`).click()
        //Send message
        cy.get('button.compose_reply_button').click()
        const message = "test messsage from cypress: " + Math.random()
        cy.get('textarea.new_message_textarea')
            .type(message)
            .should('have.value',message)
        cy.get('button#compose-send-button').click() 
        //Verify that the message got sent
        cy.get(`div.message_row> div.messagebox > div.messagebox-content > div.message_content.rendered_markdown > p:contains(${message})`)
    })
})

