import * as moment from "moment";


describe('Actividades', ()=>{

    it('Reservar una actividad',async ()=>{

        cy.visit('/#/')
        cy.get('#mat-tab-label-0-5').click();

        cy.findByRole('button', {
            name: /pasajero/i
        }).click()


        cy.get('[data-testid="infantes"]').findByText('+').dblclick({force:true});
        cy.get('[data-testid="adultos"]').findByText('+').dblclick({force:true});
        cy.get('[data-testid="ninios"]').findByText('+').click({force:true});

        cy.contains('Listo').click({force:true});


        cy.findByPlaceholderText(/ gustaría ir\?/i).type('lima').wait(1000);

        cy.findAllByRole('option').first().click();

        const checkIn = moment(new Date()).add(20,'d').format('DD/MM/YYYY');
        const checkOut = moment(new Date()).add(30,'d').format('DD/MM/YYYY');

        cy.findByPlaceholderText(/Check-In/i).focus().clear().type(checkIn);
        cy.findAllByPlaceholderText(/Check-Out/i).focus().clear().type(checkOut);

        cy.findByRole('button', {name: /buscar/i}).click();

    })


})