import { TestBed } from '@angular/core/testing';

import { FavoriteCompaniesService } from './favorite-companies.service';

describe('FavoriteCompaniesService', () => {
  let service: FavoriteCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
