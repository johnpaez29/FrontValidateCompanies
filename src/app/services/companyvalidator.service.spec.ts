import { TestBed } from '@angular/core/testing';

import { CompanyvalidatorService } from './companyvalidator.service';

describe('CompanyvalidatorService', () => {
  let service: CompanyvalidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyvalidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
