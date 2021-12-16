import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../material.module';
import { TabsComponent } from './tabs.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { PopUpPasajeroModule } from '../pop-up-pasajero/pop-up-pasajero.module';
import { PasajerosConHabitacion } from './tabs.models';

export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

describe('TabsComponent', () => {
  let fixture: ComponentFixture<TabsComponent>;
  let component: TabsComponent;
  let debugElement:DebugElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ TabsComponent ],
        imports:[
            RouterTestingModule.withRoutes([]),
            HttpClientTestingModule,
            MaterialModule,
            NgbModule,
            BrowserAnimationsModule,
            PopUpPasajeroModule
          ],
          schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  
  it('creates the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


 


  describe('Tab: Vuelo + Hotel', () => {

    beforeEach(fakeAsync(()=>{
      const matTab = debugElement.nativeElement.querySelectorAll('.mat-tab-label')[2];
      matTab.click();
      fixture.detectChanges();
      tick(100);
    }))


    it('renderizar app-pop-up-pasajero , Vuelo + Hotel', ()=>{

      const popUp = findComponent(fixture, 'app-pop-up-pasajero');
      // expect(compiled.querySelector('app-pop-up-pasajero')).toBeTruthy();

      expect(popUp).toBeTruthy();
    });

    it('Guardar informacion al cerrar el modal',()=>{

      spyOn(component,'savePasajerosVueloHotel');

      const popUp = findComponent(fixture, 'app-pop-up-pasajero');
      const mockedOutput = new PasajerosConHabitacion(3,5,1,1);

      popUp.triggerEventHandler('emitPasajeros',mockedOutput);

      expect(component.savePasajerosVueloHotel).toHaveBeenCalledWith(mockedOutput);
    })

    it('Generar Distribucion desde el hijo, getDistributionUrl(pasajeros:PasajerosSinHabitacion)',()=>{

      const mockedOutput =  new PasajerosConHabitacion(2,2,1,1);
      const mockedResult = "2-3-10,10,2";

      // const mockedUrl = "https://nmviajes.paquetedinamico.com/home?directSubmit=true&tripType=FLIGHT_HOTEL&destination=Destination::MXL&departure=Destination::LIM&departureDate=29/12/2020&arrivalDate=31/12/2020&distribution=2-3-10,10,2&businessCabin=false&lang=ES"

      const popUp = findComponent(fixture, 'app-pop-up-pasajero');
      popUp.triggerEventHandler('emitPasajeros',mockedOutput);

      expect(component.pasajerosVueloHotel).toEqual(mockedOutput);

      const result = component.getDistributionUrl(component.pasajerosVueloHotel);

      expect(result).toBe(mockedResult);

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
        "horaInicio": "",
        "horaDestino": ""
      }

      component.pasajerosVueloHotel = new PasajerosConHabitacion(1, 2, 1, 1);
      let pasajerosMockedResult = "1-3-10,10,2";
      // 1 adulto, 3 niños (2 niños de 10 años y 1 infante de 2 años)

      spyOn(component, 'getParamsTabs').and.returnValue(mockedParams)

      const mockedReponse = `https://nmviajes.paquetedinamico.com/home?directSubmit=true&tripType=FLIGHT_HOTEL&destination=Destination::MDF&departure=Destination::LIM&departureDate=27/12/2021&arrivalDate=09/01/2022&distribution=${pasajerosMockedResult}&businessCabin=false&lang=ES`;
   
      // Se hace esto para no redirigir la web ya que hay un windows.locaction
      spyOn(component,'navigateToResponseUrl').and.callFake((url)=>{
        return url;
      })

      component.searchVueloHotel();

      expect(component.navigateToResponseUrl).toHaveBeenCalledOnceWith(mockedReponse);
    })

  });

  
  it('Generar Distribucion by mock, getDistributionUrl(pasajeros:PasajerosSinHabitacion)', ()=>{

    let pasajeros 
    let result
    let mockedResult

    pasajeros = new PasajerosConHabitacion(4,6,2,1);
    result = component.getDistributionUrl(pasajeros);
    mockedResult = "4-8-10,10,10,10,10,10,2,2";
    expect(result).toBe(mockedResult);


    pasajeros = new PasajerosConHabitacion(2,3,2,1);
    result = component.getDistributionUrl(pasajeros);
    mockedResult = "2-5-10,10,10,2,2";
    expect(result).toBe(mockedResult);

    
    pasajeros = new PasajerosConHabitacion(1,2,1,1);
    result = component.getDistributionUrl(pasajeros);
    mockedResult = "1-3-10,10,2";
    expect(result).toBe(mockedResult);
    
  })

  it("Generar Parametros, getParamsTabs()", ()=>{

    const tabVueloHotel = 1;

    component.fromDate = new NgbDate(2021,12,27);
    component.toDate = new NgbDate(2022,1,9);

    component.form.controls['origen'].setValue("Lima, Perú");
    component.form.controls['destino'].setValue("Ciudad de México, México");
    component.form.controls['clase'].setValue("economy");

    component.citysOrigenSelect =  [
      {
          "type": "Destination:",
          "value": "LIM",
          "id": "Destination::LIM",
          "label": "Lima, Perú",
          "country": "PE"
      }
    ]
    component.citysDestinosSelect =  [
        {
          "type": "Destination:",
          "value": "MDF",
          "id": "Destination::MDF",
          "label": "Ciudad de México, México",
          "country": "MX"
      }
    ]

    const mockedReponse = {
      "startDate": "27/12/2021",
      "endDate": "09/01/2022",
      "origen": "Lima, Perú",
      "destino": "Ciudad de México, México",
      "businessClass": false,
      "idOrigen": "Destination::LIM",
      "idDestino": "Destination::MDF",
      "horaInicio": "",
      "horaDestino": ""
  }


    const result = component.getParamsTabs(tabVueloHotel);

    expect(result).toEqual(mockedReponse);

  })

  
});


