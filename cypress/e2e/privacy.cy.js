/// <reference types="cypress"/>
describe('testes a página da política de privacidade ', () => {
    beforeEach(() => {
        cy.visit('src/privacy.html')
    })
    Cypress._.times(3,()=>{
        it('testa a página da política de privacidade de forma independente', () => {
            cy.contains('h1', 'CAC TAT - Política de privacidade').should('be.visible')
            cy.contains('p', 'Talking About Testing').should('be.visible')
        })
    })
   
})
