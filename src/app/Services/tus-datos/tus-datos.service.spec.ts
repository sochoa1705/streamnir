import { TestBed } from '@angular/core/testing';

import { TusDatosService } from './tus-datos.service';

describe('TusDatosService', () => {
  let service: TusDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TusDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
