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

  drawMapPopup(survey: SurveyTrack, lat: number = null, lng: number = null, centerable = true) {
    this.removeMapPopup();
    this.infoWindowHover = new google.maps.InfoWindow();
    let content = `
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
    if (survey.eventNo) {
      content = `
        ${content}
        <br>
        <strong>Event Description: </strong>${survey.eventDescription}
      `;
    }
    this.infoWindowHover.setContent(content);
    const latLng = {
      lat: lat || survey.startLatitude,
      lng: lng || survey.startLongitude
    };
    this.infoWindowHover.setPosition(latLng);
    setTimeout(() => this.infoWindowHover.open(this._map), 300);
    if (centerable) {
      this.map.panTo(latLng);
    }
  }

  removeMapPopup() {
    if (this.infoWindowHover) {
      this.infoWindowHover.close();
    }
  }
}

export enum SurveyTypes {
  actual,
  average
}