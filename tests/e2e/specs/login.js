// import { auth } from '@/firebase';

describe('User login', () => {
    before(() => {
        // auth.createUserWithEmailAndPassword('test@gmail.com', 'test@gmail.com');
    });

    it('log user', () => {
        cy.visit('http://localhost:8080/login');
        const email = cy.get('input[type="text"]');
        email.type('test@gmail.com');

        const password = cy.get('input[type="password"]');
        password.type('test@gmail.com');

        cy.get('.container').within(() => {
            cy.get('button').click();
        });

        cy.url().should('include', 'recipes');
    });
});
