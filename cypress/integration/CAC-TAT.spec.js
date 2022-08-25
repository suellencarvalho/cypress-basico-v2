/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){

    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function(){
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        
        const longText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem '
        cy.get('#firstName').type('Suellen')
        cy.get('#lastName').type('Carvalho')
        cy.get('#email').type('suellentestedencontato@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Suellen')
        cy.get('#lastName').type('Carvalho')
        cy.get('#email').type('suellentestedencontatomail.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido valor não-numérico', function(){
       
        cy.get('#phone')
          .type('juju')
          .should('have.value','')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        
        cy.get('#firstName').type('Suellen')
        cy.get('#lastName').type('Carvalho')
        cy.get('#email').type('suellentestedencontato@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })
  
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        
        cy.get('#firstName')
          .type('Suellen')
          .should('have.value', 'Suellen')
          .clear()
          .should('have.value', '')

        cy.get('#lastName')
          .type('Carvalho')
          .should('have.value', 'Carvalho')
          .clear()
          .should('have.value', '')

        cy.get('#email')
          .type('suellentestedencontato@gmail.com')
          .should('have.value', 'suellentestedencontato@gmail.com')
          .clear()
          .should('have.value', '')

        cy.get('#phone')
          .type('999803210')
          .should('have.value', '999803210')
          .clear()
          .should('have.value', '')
       
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
      cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
     })

     it('seleciona um produto (Blog) por seu índice', function(){
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
     })


     it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
     })

     it('marca cada tipo de atendimento', function(){

      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
     })

     it.only('marca ambos checkboxes, depois desmarca o último', function(){

      cy.get('input[type="checkbox"]')
        .check()
     })



    /**
     * quando quiser rodar apenas um teste coloca o ONLY depois do IT
     * it.only('preenche os campos obrigatórios e envia o formulário', function () {
        
    }) */
})
