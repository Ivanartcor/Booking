import { TestBed } from '@angular/core/testing';

import { CompanyStatisticsService } from './company-statistics.service';

describe('CompanyStatisticsService', () => {
  let service: CompanyStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
