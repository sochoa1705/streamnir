import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinosComponent } from './destinos.component';

xdescribe('DestinosComponent', () => {
  let component: DestinosComponent;
  let fixture: ComponentFixture<DestinosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
