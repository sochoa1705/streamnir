import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCurrencyComponent } from './modal-currency.component';

describe('ModalCurrencyComponent', () => {
  let component: ModalCurrencyComponent;
  let fixture: ComponentFixture<ModalCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
