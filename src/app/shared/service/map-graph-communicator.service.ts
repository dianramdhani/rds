import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { TripByTrack } from '@data/scheme/trip-by-track';

@Injectable({
  providedIn: 'root'
})
export class MapGraphCommunicatorService {
  protected _map: google.maps.Map;
  protected infoWindowHover: google.maps.InfoWindow;
  lastTrips = new Subject<TripByTrack[]>();

  constructor() { }

  set map(map: google.maps.Map) {
    this._map = map;
  }

  get map() {
    return this._map;
  }

  drawMapPopup(trip: TripByTrack) {
    if (this.infoWindowHover) {
      this.infoWindowHover.close();
    }
    this.infoWindowHover = new google.maps.InfoWindow();
    const content = `
        <ul>
            <li>
                <strong>IRI: </strong>${trip.iriResult.iriScore}
            </li>
            <li>
                <strong>Latitude: </strong>${trip.startLatitude}
            </li>
            <li>
                <strong>Longitude: </strong>${trip.startLongitude}
            </li>
        </ul>
      `;
    this.infoWindowHover.setContent(content);
    this.infoWindowHover.setPosition({
      lat: trip.startLatitude,
      lng: trip.stopLongitude
    });
    this.infoWindowHover.open(this._map);
  }
}
