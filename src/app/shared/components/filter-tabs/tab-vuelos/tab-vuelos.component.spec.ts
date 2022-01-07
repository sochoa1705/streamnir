import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabVuelosComponent } from './tab-vuelos.component';

describe('TabVuelosComponent', () => {
  let component: TabVuelosComponent;
  let fixture: ComponentFixture<TabVuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabVuelosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
