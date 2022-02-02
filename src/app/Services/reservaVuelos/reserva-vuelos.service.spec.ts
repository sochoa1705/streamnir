import { TestBed } from '@angular/core/testing';

import { ReservaVuelosService } from './reserva-vuelos.service';

describe('ReservaVuelosService', () => {
  let service: ReservaVuelosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservaVuelosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
