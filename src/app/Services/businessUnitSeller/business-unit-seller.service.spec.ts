import { TestBed } from '@angular/core/testing';

import { BusinessUnitSellerService } from './business-unit-seller.service';

describe('BusinessUnitSellerService', () => {
  let service: BusinessUnitSellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessUnitSellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
