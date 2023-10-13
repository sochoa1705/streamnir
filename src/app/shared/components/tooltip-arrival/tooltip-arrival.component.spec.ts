import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipArrivalComponent } from './tooltip-arrival.component';

describe('TooltipArrivalComponent', () => {
  let component: TooltipArrivalComponent;
  let fixture: ComponentFixture<TooltipArrivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TooltipArrivalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
