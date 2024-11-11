/// <reference types="Cypress"/>

describe('CAC TAT - Política de privacidade', ()=>{
    beforeEach('', ()=>{
        cy.visit('cypress-basico-v2/src/privacy.html')
    })
    it.only('testa a página da política de privacidade de forma independente',()=>{
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
        
    })
})