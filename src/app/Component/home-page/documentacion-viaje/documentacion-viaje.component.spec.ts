import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacionViajeComponent } from './documentacion-viaje.component';

describe('DocumentacionViajeComponent', () => {
  let component: DocumentacionViajeComponent;
  let fixture: ComponentFixture<DocumentacionViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentacionViajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentacionViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
