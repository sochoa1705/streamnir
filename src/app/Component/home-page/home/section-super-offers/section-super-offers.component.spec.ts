import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSuperOffersComponent } from './section-super-offers.component';

describe('SectionSuperOffersComponent', () => {
  let component: SectionSuperOffersComponent;
  let fixture: ComponentFixture<SectionSuperOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionSuperOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionSuperOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
