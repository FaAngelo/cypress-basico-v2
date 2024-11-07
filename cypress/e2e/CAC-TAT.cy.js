/// <reference types="Cypress" />
import chai from 'chai';
import { wrap } from 'module';

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
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')

    })
    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(2).should('have.value', 'cursos')
    })
    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })
    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(' ', ($radio) => {    //cada
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

    })
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last() //seleciona o último elemento
            .uncheck()
            .should('not.be.checked')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Fabíola')
        cy.get('#lastName').type('Ângelo')
        cy.get('#email').type('fabiola@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#phone-checkbox').should('be.checked')
        cy.get('#open-text-area').type('Utilizando o comando check, para os testes ficarem mais robustos e semânticos.')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })
    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(($input) => {
                // console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(($input) => {
                // console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
        cy.get('#privacy a').should('have.attr','target','_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=> {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

})
