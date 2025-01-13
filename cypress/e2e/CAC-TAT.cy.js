/// <reference types="cypress"/>

const { should } = require("chai")

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = Cypress._.repeat('Automatizando com a ferramenta cypress.', 10)

        cy.get('#firstName').type('Cicera')
        cy.get('#lastName').type('Fabíola')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Cicera')
        cy.get('#lastName').type('Fabíola')
        cy.get('#email').type('teste.gmail.com')
        cy.get('#open-text-area').type('Automatizando com a ferramenta cypress.')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando for preenchido com um valor não-númerico', () => {
        cy.get('#phone')
            .type('text number.98')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Fabíola')
        cy.get('#lastName').type('Ângelo')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Automatizando com a ferramenta cypress.')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Fabíola')
            .should('have.value', 'Fabíola')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Ângelo')
            .should('have.value', 'Ângelo')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('teste@gmail.com')
            .should('have.value', 'teste@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('997654378')
            .should('have.value', '997654378')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area').type('Automatizando com a ferramenta cypress.')
        cy.get('button[type="submit"]').click()

    })
    
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',()=>{
        cy.get('button[type="submit"]').click()
        
        cy.get('.error').should('be.visible')
    })
    it.only('envia o formuário com sucesso usando um comando customizado',()=>{
        const data = {
            firstName: 'Anna',
            lastName: 'Eloá',
            email: 'test@gmail.com',
            text: 'Automatizando com a ferramenta cypress.',
        }
        cy.fillMandatoryFieldsAndSubmit(data)

        cy.get('.success').should('be.visible')
    })

})
