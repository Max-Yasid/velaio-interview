import { TestBed } from '@angular/core/testing';

import { PostgresRepositoryService } from './postgres-repository.service';
import { HttpClient } from '@angular/common/http';

describe('PostgresRepositoryService', () => {
  let service: PostgresRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    TestBed.inject(HttpClient);
    service = TestBed.inject(PostgresRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
