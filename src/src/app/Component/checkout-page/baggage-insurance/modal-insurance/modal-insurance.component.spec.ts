import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInsuranceComponent } from './modal-insurance.component';

describe('ModalInsuranceComponent', () => {
  let component: ModalInsuranceComponent;
  let fixture: ComponentFixture<ModalInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
