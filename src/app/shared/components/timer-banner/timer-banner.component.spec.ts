import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerBannerComponent } from './timer-banner.component';

describe('TimerBannerComponent', () => {
  let component: TimerBannerComponent;
  let fixture: ComponentFixture<TimerBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
