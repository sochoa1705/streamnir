import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcardOfferComponent } from './newcard-offer.component';

describe('NewcardOfferComponent', () => {
  let component: NewcardOfferComponent;
  let fixture: ComponentFixture<NewcardOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcardOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcardOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
