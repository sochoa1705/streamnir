import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/shared/material.module';
import { findComponent } from 'src/app/shared/utils';
import { CalendarModule } from '../../calendar/calendar.module';
import { PopUpPasajeroModule } from '../../pop-up-pasajero/pop-up-pasajero.module';

import { TabVueloHotelComponent } from './tab-vuelo-hotel.component';

describe('TabVueloHotelComponent', () => {
  let component: TabVueloHotelComponent;
  let fixture: ComponentFixture<TabVueloHotelComponent>;
  let debugElement:DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabVueloHotelComponent ],
      imports:[
        HttpClientTestingModule,
        MaterialModule,
        PopUpPasajeroModule,
        BrowserAnimationsModule,
        CalendarModule,
        NgbModule
      ],
      providers: [
        {
          provide: MATERIAL_SANITY_CHECKS,
          useValue: false
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabVueloHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Testeando autocomplete que llame a lista de ciudades cuando son 3 palabras', async () => {

   jest.spyOn(component, 'getListCiudades');

    const event = {
      target: {
        value: 'lim'
      }
    }
    component.autoComplete(event, 1);
    expect(component.getListCiudades).toHaveBeenCalled();

  });

  describe('Tab: Vuelo + Hotel', () => {

    it('renderizar app-pop-up-pasajero , Vuelo + Hotel', ()=>{

      const popUp = findComponent(fixture, 'app-pop-up-pasajero');
      expect(popUp).toBeTruthy();
    });


    it('Generar Distribucion desde el hijo al abrir y cerrar modal, <<distribution>>',()=>{

      // const mockedOutput =  new PasajerosConHabitacion(2,2,1,1);
      const mockedResult = "2-3-10,10,2";

      // const mockedUrl = "https://nmviajes.paquetedinamico.com/home?directSubmit=true&tripType=FLIGHT_HOTEL&destination=Destination::MXL&departure=Destination::LIM&departureDate=29/12/2020&arrivalDate=31/12/2020&distribution=2-3-10,10,2&businessCabin=false&lang=ES"

      const popUp = findComponent(fixture, 'app-pop-up-pasajero');

      // NOTE mostrando abriendo poup
      popUp.componentInstance.showPasajero();

      //NOTE clickeando en el + e intenando igual el resultado del mockedResult
      popUp.componentInstance.calculateDistributionTravel('adultos',1);
      popUp.componentInstance.calculateDistributionTravel('adultos',1);
      popUp.componentInstance.calculateDistributionTravel('ninos',1);
      popUp.componentInstance.calculateDistributionTravel('ninos',1);
      popUp.componentInstance.calculateDistributionTravel('infantes',1);

      //NOTE guardando y cerrando modal esto debe emitir el triger automaticamnete
      popUp.componentInstance.savePasajeros();


      expect(component.distribution).toEqual(mockedResult);

    })

    it('Debe buscar un vuelo o hotel correctamente, searchVueloHotel()',()=>{

      const mockedParams = {
        "startDate": "27/12/2021",
        "endDate": "09/01/2022",
        "origen": "Lima, Perú",
        "destino": "Ciudad de México, México",
        "businessClass": false,
        "idOrigen": "Destination::LIM",
        "idDestino": "Destination::MDF",
      }

      let pasajerosMockedResult = "1-3-10,10,2";

      const popUp = findComponent(fixture,"app-pop-up-pasajero");


      popUp.componentInstance.calculateDistributionTravel('adultos',1);
      popUp.componentInstance.calculateDistributionTravel('adultos',1);
      popUp.componentInstance.calculateDistributionTravel('ninos',1);
      popUp.componentInstance.calculateDistributionTravel('ninos',1);
      popUp.componentInstance.calculateDistributionTravel('infantes',1);


      // 1 adulto, 3 niños (2 niños de 10 años y 1 infante de 2 años);

      popUp.triggerEventHandler('emitDistribution',pasajerosMockedResult);

      expect(component.distribution).toEqual(pasajerosMockedResult);


      jest.spyOn(component, 'getParamsVueloHotel').mockReturnValue(mockedParams);

      const mockedReponse = `https://nmviajes.paquetedinamico.com/home?directSubmit=true&tripType=FLIGHT_HOTEL&destination=Destination::MDF&departure=Destination::LIM&departureDate=27/12/2021&arrivalDate=09/01/2022&distribution=${pasajerosMockedResult}&businessCabin=false&lang=ES`;
   
      // Se hace esto para no redirigir la web ya que hay un windows.locaction
      jest.spyOn(component,'navigateToResponseUrl').mockImplementation((url)=>{
        return url;
      })

      component.searchVueloHotel();

      expect(component.navigateToResponseUrl).toHaveBeenCalledWith(mockedReponse);
    })

  });
  
});
