import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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

    it('Generar Distribucion by mock', ()=>{

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

  });



  
});


