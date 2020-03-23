import { TestBed } from '@angular/core/testing';

import { IriCalibrationService } from './iri-calibration.service';

describe('IriCalibrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IriCalibrationService = TestBed.get(IriCalibrationService);
    expect(service).toBeTruthy();
  });
});
