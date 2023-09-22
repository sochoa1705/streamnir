import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultivueloComponent } from './multivuelo.component';

describe('MultivueloComponent', () => {
  let component: MultivueloComponent;
  let fixture: ComponentFixture<MultivueloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultivueloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultivueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
