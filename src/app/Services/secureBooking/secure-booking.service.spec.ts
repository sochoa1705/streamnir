import { TestBed } from '@angular/core/testing';

import { SecureBookingService } from './secure-booking.service';

describe('SecureBookingService', () => {
  let service: SecureBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecureBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
