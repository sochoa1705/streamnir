import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabVuelosV2Component } from './tab-vuelos-v2.component';

describe('TabVuelosV2Component', () => {
  let component: TabVuelosV2Component;
  let fixture: ComponentFixture<TabVuelosV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabVuelosV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabVuelosV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
