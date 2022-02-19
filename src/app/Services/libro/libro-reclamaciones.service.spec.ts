import { TestBed } from '@angular/core/testing';

import { LibroReclamacionesService } from './libro-reclamaciones.service';

describe('LibroReclamacionesService', () => {
  let service: LibroReclamacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibroReclamacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
