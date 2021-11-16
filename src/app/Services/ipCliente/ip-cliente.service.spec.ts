import { TestBed } from '@angular/core/testing';

import { IpClienteService } from './ip-cliente.service';

describe('IpClienteService', () => {
  let service: IpClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
