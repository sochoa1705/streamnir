import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPackagesComponent } from './section-packages.component';

describe('SectionPackagesComponent', () => {
  let component: SectionPackagesComponent;
  let fixture: ComponentFixture<SectionPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionPackagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
