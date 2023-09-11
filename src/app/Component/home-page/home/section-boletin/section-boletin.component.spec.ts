import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBoletinComponent } from './section-boletin.component';

describe('SectionBoletinComponent', () => {
  let component: SectionBoletinComponent;
  let fixture: ComponentFixture<SectionBoletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionBoletinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionBoletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
