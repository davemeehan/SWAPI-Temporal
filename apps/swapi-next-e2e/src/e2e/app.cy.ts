import { getGreeting } from '../support/app.po';

describe('swapi-next-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it.skip('should display welcome message', () => {
    getGreeting().contains(/Workflows/);
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('create', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.MuiGrid2-grid-sm-4 > .MuiButtonBase-root').click();
    cy.get('#name').clear();
    cy.get('#name').type('test');
    cy.get('body').click();
    cy.get('[data-testid="jobs"]').click();
    cy.get('[data-value="people"]').click();
    cy.get('#name').click();
    cy.get('#\\:r1p\\:').clear();
    cy.get('#\\:r1p\\:').type('test');
    cy.get(
      '.mui-1h20jme > .MuiGrid2-container > .MuiGrid2-root > .MuiButton-contained'
    ).click();
    cy.get(
      '.Mui-hovered > [data-field="result"] > .MuiButtonBase-root'
    ).click();
    cy.get('.MuiTreeItem-label').click();
    cy.get(
      '.mui-1h20jme > .MuiGrid2-container > .MuiGrid2-root > .MuiButtonBase-root'
    ).click();
    /* ==== End Cypress Studio ==== */
  });
});
