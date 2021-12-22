import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetNombrePipe } from './pipes/getNombrePopUp.pipe';

import { PopUpPasajeroComponent } from './pop-up-pasajero.component';

describe('PopUpPasajeroComponent', () => {
  let component: PopUpPasajeroComponent;
  let fixture: ComponentFixture<PopUpPasajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpPasajeroComponent, GetNombrePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpPasajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crearse', () => {
    expect(component).toBeTruthy();
  });


  it('Probando con Adultos, calculateDistributionTravel(optionTravel: string, optionAddRemove: number)',()=>{
    
    let mockedData = {optionTravel:'adultos', optionAddRemove:1};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.adultos).toEqual(1);

    mockedData = {optionTravel:'adultos', optionAddRemove:1};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.adultos).toEqual(2);

    mockedData = {optionTravel:'adultos', optionAddRemove:0};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.adultos).toEqual(1);

    mockedData = {optionTravel:'adultos', optionAddRemove:0};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.adultos).toEqual(0);

    mockedData = {optionTravel:'adultos', optionAddRemove:0};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.adultos).toEqual(0);
  })


  it('Probando con Infantes, calculateDistributionTravel(optionTravel: string, optionAddRemove: number)',()=>{
    let mockedData = {optionTravel:'infantes', optionAddRemove:1};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.infantes).toEqual(1);

    mockedData = {optionTravel:'infantes', optionAddRemove:1};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.infantes).toEqual(2);

    mockedData = {optionTravel:'infantes', optionAddRemove:0};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.infantes).toEqual(1);

    mockedData = {optionTravel:'infantes', optionAddRemove:0};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.infantes).toEqual(0);

    mockedData = {optionTravel:'infantes', optionAddRemove:0};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.infantes).toEqual(0);

  })

  it('Probando con niños, calculateDistributionTravel(optionTravel: string, optionAddRemove: number)', ()=>{

    let mockedData = {optionTravel:'ninos', optionAddRemove:0};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.ninos).toEqual(0);

    mockedData = {optionTravel:'ninos', optionAddRemove:0};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.ninos).toEqual(0);

    mockedData = {optionTravel:'ninos', optionAddRemove:1};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.ninos).toEqual(1);

    mockedData = {optionTravel:'ninos', optionAddRemove:4};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.ninos).toEqual(0);

    mockedData = {optionTravel:'ninos', optionAddRemove:1};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.ninos).toEqual(1);

    mockedData = {optionTravel:'ninos', optionAddRemove:0};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.ninos).toEqual(0);
    
    mockedData = {optionTravel:'ninos', optionAddRemove:0};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.ninos).toEqual(0);

    mockedData = {optionTravel:'ninos', optionAddRemove:0};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.ninos).toEqual(0);
  })

  it("Probando con habitacion,calculateDistributionTravel(optionTravel:string, optionAddRemove: number)",()=>{

    let mockedData = {optionTravel:'habitacion', optionAddRemove:1};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);

    mockedData = {optionTravel:'habitacion', optionAddRemove:1};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);

    mockedData = {optionTravel:'habitacion', optionAddRemove:0};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);

    mockedData = {optionTravel:'habitacion', optionAddRemove:1};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);

    mockedData = {optionTravel:'habitacion', optionAddRemove:1};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);

    expect(component.habitacion).toEqual(1);

    component.habitacionDisabled = false;

    mockedData = {optionTravel:'habitacion', optionAddRemove:1};
    component.calculateDistributionTravel(mockedData.optionTravel,mockedData.optionAddRemove);
    expect(component.habitacion).toEqual(2);

  })




  it('Generando distribucion abriendo el modal y dandole al guardar, <<emitDistribution>>',()=>{

    jest.spyOn(component.emitDistribution, 'emit');

    // const mockedOutput =  new PasajerosConHabitacion(2,2,1,1);
    const mockedResult = "2-3-10,10,2";

    // const mockedUrl = "https://nmviajes.paquetedinamico.com/home?directSubmit=true&tripType=FLIGHT_HOTEL&destination=Destination::MXL&departure=Destination::LIM&departureDate=29/12/2020&arrivalDate=31/12/2020&distribution=2-3-10,10,2&businessCabin=false&lang=ES"

    const popUp = fixture.debugElement;

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

    fixture.detectChanges();

    expect(component.emitDistribution.emit).toHaveBeenCalledWith(mockedResult);

  })

});
