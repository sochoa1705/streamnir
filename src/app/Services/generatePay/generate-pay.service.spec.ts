import { TestBed } from '@angular/core/testing';

import { GeneratePayService } from './generate-pay.service';

xdescribe('GeneratePayService', () => {
  let service: GeneratePayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratePayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
