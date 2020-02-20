import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TripByTrack } from '@data/scheme/trip-by-track';
import { Trip } from '@data/scheme/trip';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  protected url: string;
  protected _map: google.maps.Map;
  lastTrips = new Subject<TripByTrack[]>();

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = window['config']().api;
  }

  getTripByTrack(tripId: string | number) {
    return this.httpClient.get<TripByTrack[]>(`${this.url}/trip-service/trips/${tripId}/tracks/route`);
  }

  retrieveAllTrips() {
    return this.httpClient.get<Trip[]>(`${this.url}/trip-service/trips`);
  }

  set map(map: google.maps.Map) {
    this._map = map;
  }

  get map() {
    return this._map;
  }
}