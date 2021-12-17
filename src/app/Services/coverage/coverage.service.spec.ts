import { TestBed } from '@angular/core/testing';

import { CoverageService } from './coverage.service';

xdescribe('CoverageService', () => {
  let service: CoverageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoverageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
