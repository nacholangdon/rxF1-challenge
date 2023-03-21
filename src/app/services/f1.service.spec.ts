import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { F1Service } from './f1.service';

describe('F1Service', () => {
  let service: F1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(F1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
