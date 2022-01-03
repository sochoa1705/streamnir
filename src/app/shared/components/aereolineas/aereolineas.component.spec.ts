import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AereolineasComponent } from './aereolineas.component';

describe('AereolineasComponent', () => {
  let component: AereolineasComponent;
  let fixture: ComponentFixture<AereolineasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AereolineasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AereolineasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
