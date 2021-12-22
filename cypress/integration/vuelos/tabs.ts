import * as moment from "moment";


describe('Hoteles', ()=>{

    it('Reservar un hotel',async ()=>{

        cy.visit('/#/')
        cy.get('#mat-tab-label-0-3').click();

        cy.findByRole('button', {
            name: /habitación \- pasajero/i
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



   
   


    // userEvent.click(btnListo);

    // await waitForElementToBeRemoved(seccionAdultos);

    // jest.spyOn(fixture.componentInstance, 'autoComplete')

    // expect(seccionAdultos).not.toBeVisible();

    // userEvent.type(ciudadControl, 'mex');

    // expect(screen.getByRole('listbox')).toBeVisible();
    // const listOption = screen.getAllByRole('option');
    // expect(listOption).toHaveLength(1);

    // userEvent.dblClick(listOption[0]);
    
    // fixture.componentInstance.form.controls['destino'].setValue(mockedDestiny[0].label);

    // fireEvent.change(fechaIni, { target: { value: "20-12-2021" } });
    // fireEvent.change(fechaFin, { target: { value: "25-12-2021" } });

    // const btnBuscar = screen.getByRole('button', {
    //   name: /buscar/i
    // })

    // userEvent.click(btnBuscar);

    // expect(fixture.componentInstance.navigateToResponseUrl).toHaveBeenCalled();




})