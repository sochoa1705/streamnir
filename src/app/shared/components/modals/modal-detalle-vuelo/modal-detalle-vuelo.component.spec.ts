import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleVueloComponent } from './modal-detalle-vuelo.component';

describe('ModalDetalleVueloComponent', () => {
  let component: ModalDetalleVueloComponent;
  let fixture: ComponentFixture<ModalDetalleVueloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetalleVueloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
