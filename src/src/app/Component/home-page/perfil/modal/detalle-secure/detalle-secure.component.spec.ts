import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBookingComponent } from './detalle-booking.component';

describe('DetalleBookingComponent', () => {
  let component: DetalleBookingComponent;
  let fixture: ComponentFixture<DetalleBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
