import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCarruselComponent } from './section-carrusel.component';

describe('SectionCarruselComponent', () => {
  let component: SectionCarruselComponent;
  let fixture: ComponentFixture<SectionCarruselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionCarruselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
