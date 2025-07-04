import { TestBed } from '@angular/core/testing';

import { SuperpoderesService } from './superpoderes.service';

describe('SuperpoderesService', () => {
  let service: SuperpoderesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperpoderesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
