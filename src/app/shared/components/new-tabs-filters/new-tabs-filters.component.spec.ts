import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTabsFiltersComponent } from './new-tabs-filters.component';

describe('NewTabsFiltersComponent', () => {
  let component: NewTabsFiltersComponent;
  let fixture: ComponentFixture<NewTabsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTabsFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTabsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
