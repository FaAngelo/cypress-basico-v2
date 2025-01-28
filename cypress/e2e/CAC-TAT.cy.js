/// <reference types="cypress"/>

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
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Cicera')
        cy.get('#lastName').type('Fabíola')
        cy.get('#email').type('teste.gmail.com')
        cy.get('#open-text-area').type('Automatizando com a ferramenta cypress.')
        cy.contains('button', 'Enviar').click()

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
        cy.contains('button', 'Enviar').click()

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
        cy.contains('button', 'Enviar').click()

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', () => {
        const data = {
            firstName: 'Anna',
            lastName: 'Eloá',
            email: 'test@gmail.com',
            text: 'Automatizando com a ferramenta cypress.',
        }
        cy.fillMandatoryFieldsAndSubmit(data)

        cy.contains('button', 'Enviar').click()
    })
    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube')
        cy.get('#product').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria')
        cy.get('#product').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1)
        cy.get('#product').should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')
    })
    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .each(typeOfService => {
                cy.wrap(typeOfService).check()
                    .should('be.checked')
            })
    })
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should("not.be.checked")
    })
    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
            .selectFile('../cypress-basico-v2/cypress/fixtures/example.json')
            .should((input) => {
                // console.log(input)
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
            .selectFile('../cypress-basico-v2/cypress/fixtures/example.json', { action: 'drag-drop' })
                .should((input) => {
                    expect(input[0].files[0].name).to.equal('example.json')
                })
    })
    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',()=>{
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
        .selectFile('@sampleFile')
            .should((input) => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })
    it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique',()=>{
        cy.contains('a','Política de Privacidade')
        .should('have.attr', 'href', 'privacy.html')
        .and('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removando o target e então clicando no link ',()=>{
        cy.contains('a','Política de Privacidade')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('h1','CAC TAT - Política de privacidade').should('be.visible')
    })
    
})
