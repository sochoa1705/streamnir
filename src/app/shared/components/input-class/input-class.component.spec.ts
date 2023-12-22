import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputClassComponent } from './input-class.component';

describe('InputClassComponent', () => {
  let component: InputClassComponent;
  let fixture: ComponentFixture<InputClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
