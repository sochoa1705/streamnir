import { TestBed } from '@angular/core/testing';

import { UpdatePayService } from './update-pay.service';

describe('UpdatePayService', () => {
  let service: UpdatePayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatePayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
