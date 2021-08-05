import { TestBed } from '@angular/core/testing';

import { AsidePresenterService } from './aside-presenter.service';

describe('AsidePresenterService', () => {
  let service: AsidePresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsidePresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
