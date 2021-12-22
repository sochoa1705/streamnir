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
import { ParamsHoteles, ParamsVueloHotel, PasajerosConHabitacion, URLVueloHotel } from './tabs.models';
import { ROUTE_VIAJES } from '../../constant';
import { FormControl, FormGroup } from '@angular/forms';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';


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
          providers: [
            {
              provide: MATERIAL_SANITY_CHECKS,
              useValue: false
            }
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


  describe('Tab: Paquetes', ()=>{

    it("Redirigir a url paquetes", fakeAsync(()=>{

      jest.spyOn(component,'navigateToResponseUrl').mockImplementation((url)=>url) 

      const matTab = debugElement.nativeElement.querySelectorAll('.mat-tab-label')[1];
      matTab.click();
      fixture.detectChanges();
      tick(100);

      const url = ROUTE_VIAJES.RUTA_PAQUETES;
      expect(component.navigateToResponseUrl).toHaveBeenCalledWith(url);
    }))

  })

  describe('Tab: Hoteles', ()=>{


    it("Generar Parametros, getParamsTabs()", ()=>{

      const fromDate = new NgbDate(2021,12,27);
      const toDate = new NgbDate(2022,1,9);

      const form = new FormGroup({
        destino: new FormControl('Ciudad de México, México'),
      })
        
      const citysDestinosSelect =  [
          {
            "type": "Destination:",
            "value": "MDF",
            "id": "Destination::MDF",
            "label": "Ciudad de México, México",
            "country": "MX"
        }
      ]
  
      const mockedReponse = {
        destino: "Ciudad de México, México",
        endDate: "09/01/2022",
        idDestino: "Destination::MDF",
        startDate: "27/12/2021"
    }

    // component.getParamsTabs(tabVueloHotel);

      let result = new ParamsHoteles(
        fromDate,
        toDate,
        form,
        citysDestinosSelect
      ).getParams();
      
      expect(result).toEqual(mockedReponse);

    })



    
  })

});


