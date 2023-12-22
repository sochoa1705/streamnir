import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInactivityComponent } from './modal-inactivity.component';

describe('ModalInactivityComponent', () => {
  let component: ModalInactivityComponent;
  let fixture: ComponentFixture<ModalInactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInactivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
