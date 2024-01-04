import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBoletinComponent } from './modal-boletin.component';

describe('ModalBoletinComponent', () => {
  let component: ModalBoletinComponent;
  let fixture: ComponentFixture<ModalBoletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBoletinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBoletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
