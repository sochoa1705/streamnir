import { TestBed } from '@angular/core/testing';

import { LoaderSubjectService } from './loader-subject.service';

describe('LoaderSubjectService', () => {
  let service: LoaderSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
