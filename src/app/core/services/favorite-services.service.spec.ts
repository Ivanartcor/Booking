import { TestBed } from '@angular/core/testing';

import { FavoriteServicesService } from './favorite-services.service';

describe('FavoriteServicesService', () => {
  let service: FavoriteServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
