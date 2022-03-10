import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionErrorComponent } from './notificacion-error.component';

describe('NotificacionErrorComponent', () => {
  let component: NotificacionErrorComponent;
  let fixture: ComponentFixture<NotificacionErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificacionErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
