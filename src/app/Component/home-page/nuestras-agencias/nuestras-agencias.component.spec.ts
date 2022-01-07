import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestrasAgenciasComponent } from './nuestras-agencias.component';

describe('NuestrasAgenciasComponent', () => {
  let component: NuestrasAgenciasComponent;
  let fixture: ComponentFixture<NuestrasAgenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuestrasAgenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuestrasAgenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
