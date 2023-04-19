import { TestBed } from '@angular/core/testing';

import { CountryRatesResolver } from './country-rates.resolver';

describe('CountryRatesResolver', () => {
  let resolver: CountryRatesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CountryRatesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
