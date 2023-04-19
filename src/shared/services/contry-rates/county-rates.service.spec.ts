import { TestBed } from '@angular/core/testing';

import { CountyRatesService } from './county-rates.service';

describe('CountyRatesService', () => {
  let service: CountyRatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountyRatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
