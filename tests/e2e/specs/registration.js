
describe('User register', () => {
    beforeEach(() => {
        cy.request('DELETE', 'http://localhost:9099/emulator/v1/projects/test-b4655/accounts');
    })

    afterEach(() => {
        cy.request('DELETE', 'http://localhost:9099/emulator/v1/projects/test-b4655/accounts');
    })

    it('first user registration', () => {
        cy.visit('http://localhost:8080/register');
        const email = cy.get('input[type="text"]');
        email.type('test@gmail.com');

        const password = cy.get('input[type="password"]');
        password.type('test@gmail.com');

        cy.get('.container').within(() => {
            cy.get('button').click()
        })

        cy.url().should('include', 'recipes')
    })
})
