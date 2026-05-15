describe('TechStore Home Page', () => {
  beforeEach(() => {
    // Navigate to the home page before each test
    cy.visit('/')
  })

  it('should display the correct title or brand name', () => {
    cy.contains('TechStore').should('be.visible')
  })

  it('should be able to render the page correctly', () => {
    cy.get('body').should('be.visible')
  })

  it('should allow user to type in the search bar', () => {
    // Cherche un input de type texte (la barre de recherche) et tape "iPhone"
    cy.get('input[type="text"]')
      .should('be.visible')
      .type('iPhone')
      .should('have.value', 'iPhone')
  })

  it('should navigate when clicking "Voir le catalogue"', () => {
    // Cherche le bouton "Voir le catalogue" et clique dessus
    cy.contains('Voir le catalogue').should('be.visible').click()
    
    // Vérifie de manière robuste que l'URL contient la bonne route après la navigation
    cy.url().should('include', '/accessoires')
  })
})
