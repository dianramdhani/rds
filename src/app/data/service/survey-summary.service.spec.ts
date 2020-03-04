import { TestBed } from '@angular/core/testing';

import { SurveySummaryService } from './survey-summary.service';

describe('SurveySummaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurveySummaryService = TestBed.get(SurveySummaryService);
    expect(service).toBeTruthy();
  });
});
