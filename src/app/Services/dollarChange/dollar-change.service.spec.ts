import { TestBed } from '@angular/core/testing';

import { DollarChangeService } from './dollar-change.service';

xdescribe('DollarChangeService', () => {
  let service: DollarChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DollarChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
