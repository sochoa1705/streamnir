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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
