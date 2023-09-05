import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLoaderResultComponent } from './card-loader-result.component';

describe('CardLoaderResultComponent', () => {
  let component: CardLoaderResultComponent;
  let fixture: ComponentFixture<CardLoaderResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardLoaderResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardLoaderResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
