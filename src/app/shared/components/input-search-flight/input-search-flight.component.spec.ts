import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchFlightComponent } from './input-search-flight.component';

describe('InputSearchFlightComponent', () => {
  let component: InputSearchFlightComponent;
  let fixture: ComponentFixture<InputSearchFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSearchFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSearchFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
