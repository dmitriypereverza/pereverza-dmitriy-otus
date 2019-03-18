import { TestBed } from '@angular/core/testing';

import { StarageService } from './translate.service';

describe('TranslateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StarageService = TestBed.get(StarageService);
    expect(service).toBeTruthy();
  });
});
