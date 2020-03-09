import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { SurveyTrack } from '@data/scheme/survey-track';

@Injectable({
  providedIn: 'root'
})
export class MapGraphCommunicatorService {
  protected _map: google.maps.Map;
  protected infoWindowHover: google.maps.InfoWindow;
  lastSurveys = new Subject<SurveyTrack[]>();

  constructor() { }

  set map(map: google.maps.Map) {
    this._map = map;
  }

  get map() {
    return this._map;
  }

  drawMapPopup(survey: SurveyTrack) {
    if (this.infoWindowHover) {
      this.infoWindowHover.close();
    }
    this.infoWindowHover = new google.maps.InfoWindow();
    const content = `
        <ul>
            <li>
                <strong>IRI: </strong>${survey.iriResult.iriScore}
            </li>
            <li>
                <strong>Latitude: </strong>${survey.startLatitude}
            </li>
            <li>
                <strong>Longitude: </strong>${survey.startLongitude}
            </li>
        </ul>
      `;
    this.infoWindowHover.setContent(content);
    this.infoWindowHover.setPosition({
      lat: survey.startLatitude,
      lng: survey.stopLongitude
    });
    this.infoWindowHover.open(this._map);
  }
}

export enum SurveyType {
  actual,
  average
}