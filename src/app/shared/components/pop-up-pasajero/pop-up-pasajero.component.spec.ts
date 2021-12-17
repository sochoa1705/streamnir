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

});
