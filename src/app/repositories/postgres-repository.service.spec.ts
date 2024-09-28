import { TestBed } from '@angular/core/testing';

import { PostgresRepositoryService } from './postgres-repository.service';

describe('PostgresRepositoryService', () => {
  let service: PostgresRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostgresRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
