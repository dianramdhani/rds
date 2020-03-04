import { TestBed } from '@angular/core/testing';

import { MapGraphCommunicatorService } from './map-graph-communicator.service';

describe('MapGraphCommunicatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapGraphCommunicatorService = TestBed.get(MapGraphCommunicatorService);
    expect(service).toBeTruthy();
  });
});
