import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUnsavedComponent } from './modal-unsaved.component';

describe('ModalUnsavedComponent', () => {
  let component: ModalUnsavedComponent;
  let fixture: ComponentFixture<ModalUnsavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUnsavedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUnsavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
