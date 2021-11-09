import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AerolineasComponent } from './aerolineas.component';

describe('AerolineasComponent', () => {
  let component: AerolineasComponent;
  let fixture: ComponentFixture<AerolineasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AerolineasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AerolineasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
