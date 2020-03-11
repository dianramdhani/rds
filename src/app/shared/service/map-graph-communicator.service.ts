import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { formatDate, formatNumber } from '@angular/common';

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
        <strong>Date: </strong>${formatDate(survey.trackDate, 'medium', 'en')}
        <br>
        <strong>IRI: </strong>${formatNumber(survey.iriResult.iriScore, 'en', '.0-2')} m/km
        <br>
        <strong>Speed: </strong>${formatNumber(survey.speed, 'en', '.0-2')} km/h
        <br>
        <strong>Latitude: </strong>${survey.startLatitude}
        <br>
        <strong>Longitude: </strong>${survey.startLongitude}
      `;
    this.infoWindowHover.setContent(content);
    const latLng = {
      lat: survey.startLatitude,
      lng: survey.stopLongitude
    };
    this.infoWindowHover.setPosition(latLng);
    this.infoWindowHover.open(this._map);
    this.map.setCenter(latLng);
  }
}

export enum SurveyTypes {
  actual,
  average
}