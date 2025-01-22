import { TestBed } from '@angular/core/testing';

import { ProductRequestsService } from './product-requests.service';

describe('ProductRequestsService', () => {
  let service: ProductRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
