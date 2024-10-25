/// <reference types="Cypress" />
import chai from 'chai';

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach('', () => {
        cy.visit('cypress-basico-v2/src/index.html')
    })
    it('verifica o título da aplicação', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Fabíola')
        cy.get('#lastName').type('Ângelo')
        cy.get('#email').type('fabiola@gmail.com')
        cy.get('#open-text-area').type('Testes automatizados utilizando a ferramenta cypress', { delay: 0 })
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Fabíola')
        cy.get('#lastName').type('Ângelo')
        cy.get('#email').type('fabiolagmail.com')
        cy.get('#open-text-area').type('Testes automatizados utilizando a ferramenta cypress', { delay: 0 })
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })
    it('campo de telefone vazio quando valores não-numéricos são digitados', () => {
        cy.get('#phone')
            .type('number')
            .should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Fabíola')
        cy.get('#lastName').type('Ângelo')
        cy.get('#email').type('fabiola@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Testes automatizados utilizando a ferramenta cypress', { delay: 0 })
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Fabíola')
            .should('have.value', 'Fabíola')
            .clear()
            .should('have.value', '')

        cy.get('#firstName')
            .type('Ângelo')
            .should('have.value', 'Ângelo')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('fabiola@gmail.com')
            .should('have.value', 'fabiola@gmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type(88992457896)
            .should('have.value', '88992457896')
            .clear()
            .should('have.value', '')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

})