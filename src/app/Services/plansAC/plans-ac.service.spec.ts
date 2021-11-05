import { TestBed } from '@angular/core/testing';

import { PlansACService } from './plans-ac.service';

describe('PlansACService', () => {
  let service: PlansACService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlansACService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
