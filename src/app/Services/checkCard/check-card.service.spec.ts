import { TestBed } from '@angular/core/testing';

import { CheckCardService } from './check-card.service';

describe('CheckCardService', () => {
  let service: CheckCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
