import { TestBed } from '@angular/core/testing';

import { DataPagePresenterService } from './data-page-presenter.service';

describe('DataPagePresenterService', () => {
  let service: DataPagePresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPagePresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
