import { TestBed } from '@angular/core/testing';

import { AdoService } from './ado.service';

describe('AdoService', () => {
  let service: AdoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
