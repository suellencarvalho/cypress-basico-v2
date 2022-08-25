Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Suellen')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('suellentestedencontato@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})