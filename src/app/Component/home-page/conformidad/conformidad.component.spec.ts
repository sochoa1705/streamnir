import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConformidadComponent } from './conformidad.component';

xdescribe('ConformidadComponent', () => {
  let component: ConformidadComponent;
  let fixture: ComponentFixture<ConformidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConformidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConformidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
