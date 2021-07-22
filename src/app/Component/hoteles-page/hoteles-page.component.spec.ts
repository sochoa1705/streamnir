import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelesPageComponent } from './hoteles-page.component';

describe('HotelesPageComponent', () => {
  let component: HotelesPageComponent;
  let fixture: ComponentFixture<HotelesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
