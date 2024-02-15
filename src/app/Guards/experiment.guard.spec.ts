import { TestBed } from '@angular/core/testing';

import { ExperimentGuard } from './experiment.guard';

describe('ExperimentGuard', () => {
  let guard: ExperimentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExperimentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
