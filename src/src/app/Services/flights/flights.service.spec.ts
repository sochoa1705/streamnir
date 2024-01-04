import { TestBed } from '@angular/core/testing';

import { FlightsService } from './flights.service';

xdescribe('FlightsService', () => {
  let service: FlightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightsService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
