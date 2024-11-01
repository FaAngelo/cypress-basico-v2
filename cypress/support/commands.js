
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', ()=>{
    cy.get('#firstName').type('Fabíola')
        cy.get('#lastName').type('Ângelo')
        cy.get('#email').type('fabiola@gmail.com')
        cy.get('#open-text-area').type('Testes automatizados utilizando a ferramenta cypress')
        cy.get('.button').click()
})
