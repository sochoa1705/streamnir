import { TestBed } from '@angular/core/testing';

import { StatePayService } from './state-pay.service';

describe('StatePayService', () => {
  let service: StatePayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatePayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
