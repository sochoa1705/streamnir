import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPassengersComponent } from './input-passengers.component';

describe('InputPassengersComponent', () => {
  let component: InputPassengersComponent;
  let fixture: ComponentFixture<InputPassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputPassengersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
