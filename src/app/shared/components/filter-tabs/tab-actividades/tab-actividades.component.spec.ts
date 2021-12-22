import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/shared/material.module';
import { PopUpPasajeroModule } from '../../pop-up-pasajero/pop-up-pasajero.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fireEvent, getByText, prettyDOM, waitFor, waitForElementToBeRemoved, within } from '@testing-library/dom';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { of } from 'rxjs';
import { createMock } from '@testing-library/angular/jest-utils';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TabActividadesComponent } from './tab-actividades.component';


describe('TabActividadesComponent', () => {

  it('El actor realiza una actividad de hotel', async () => {

    const mockedDestiny = [
      {
        "type": "Destination:",
        "value": "MDF",
        "id": "Destination::MDF",
        "label": "Ciudad de México, México",
        "country": "MX"
      }
    ]

    const destinyService = createMock(DestinyService);

    jest.spyOn(destinyService, 'getDestinyPaqueteDinamico').mockImplementation((search: string, typeSearch: string) => of(mockedDestiny))

    // destinyService.getDestinyPaqueteDinamico = jest.fn(()=>of(mockedDestiny));

    const { container, fixture } = await render(TabActividadesComponent, {
      imports: [
        MaterialModule,
        NgbModule,
        PopUpPasajeroModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: MATERIAL_SANITY_CHECKS, useValue: false },
        {
          provide: DestinyService,
          useValue: destinyService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })

    jest.spyOn(fixture.componentInstance, 'navigateToResponseUrl').mockImplementation((value) => value);

    const btnHabitacion = screen.getByRole('button', {
      name: /pasajero/i
    })

    const ciudadControl = screen.getByPlaceholderText(/ gustaría ir\?/i);

    const fechaIni = screen.getByPlaceholderText(/Check-In/i);
    const fechaFin = screen.getByPlaceholderText(/Check-Out/i);

    expect(btnHabitacion).toBeVisible();
    expect(ciudadControl).toBeVisible();
    expect(fechaIni).toBeVisible();
    expect(fechaFin).toBeVisible();

    userEvent.click(btnHabitacion);

    const seccionAdultos = screen.getByTestId('adultos');
    const seccionNinios = screen.getByTestId('ninios');
    const seccionInfantes = screen.getByTestId('infantes');

    expect(seccionAdultos).toBeVisible();

    const btnListo = screen.getByRole('button', {
      name: /listo/i
    })

    userEvent.dblClick(getByText(seccionAdultos, '+'));
    expect(within(seccionAdultos).getByRole('textbox')).toHaveValue('2');

    userEvent.dblClick(getByText(seccionNinios, '+'));
    userEvent.click(getByText(seccionNinios, '+'));
    expect(within(seccionNinios).getByRole('textbox')).toHaveValue('3');

    userEvent.click(getByText(seccionInfantes, '+'));
    expect(within(seccionInfantes).getByRole('textbox')).toHaveValue('1');

    userEvent.click(getByText(seccionNinios, '-'));
    expect(within(seccionNinios).getByRole('textbox')).toHaveValue('2');

    userEvent.click(btnListo);

    await waitForElementToBeRemoved(seccionAdultos);

    jest.spyOn(fixture.componentInstance, 'autoComplete')

    expect(seccionAdultos).not.toBeVisible();

    userEvent.type(ciudadControl, 'mex');

    expect(screen.getByRole('listbox')).toBeVisible();
    const listOption = screen.getAllByRole('option');
    expect(listOption).toHaveLength(1);

    userEvent.dblClick(listOption[0]);
    
    fixture.componentInstance.form.controls['destino'].setValue(mockedDestiny[0].label);

    fireEvent.change(fechaIni, { target: { value: "20-12-2021" } });
    fireEvent.change(fechaFin, { target: { value: "25-12-2021" } });

    const btnBuscar = screen.getByRole('button', {
      name: /buscar/i
    })

    userEvent.click(btnBuscar);

    expect(fixture.componentInstance.navigateToResponseUrl).toHaveBeenCalled();

  })
});


