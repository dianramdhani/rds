import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { TripByTrack } from '@data/scheme/trip-by-track';

@Injectable({
  providedIn: 'root'
})
export class MapGraphCommunicatorService {
  protected _map: google.maps.Map;
  lastTrips = new Subject<TripByTrack[]>();
  
  constructor() { }

  set map(map: google.maps.Map) {
    this._map = map;
  }

  get map() {
    return this._map;
  }
}
