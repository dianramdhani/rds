import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SurveyTrack } from '@data/scheme/survey-track';
import { MapGraphCommunicatorService } from '@shared/service/map-graph-communicator.service';

@Component({
  selector: 'app-map-v2',
  templateUrl: './map-v2.component.html',
  styleUrls: ['./map-v2.component.scss']
})
export class MapV2Component implements OnInit {
  @ViewChild('map', { static: true }) mapEl: ElementRef;
  @ViewChild('legend', { static: true }) legendEl: ElementRef;
  surveys: SurveyTrack[] = [];

  constructor(
    private mapGraphCommunicatorService: MapGraphCommunicatorService
  ) { }

  ngOnInit() {
    this.mapGraphCommunicatorService.map = new google.maps.Map(this.mapEl.nativeElement, {
      zoom: 16,
      center: new google.maps.LatLng({ lat: -6.899514, lng: 107.6137633 })
    });

    this.mapGraphCommunicatorService.lastSurveys
      .subscribe(surveys => {
        this.surveys = surveys;
        this.clearAll();
        this.drawIri();
      });
  }

  polylinesIri: google.maps.Polyline[] = [];
  protected drawIri() {
    const
      colorsBar = [
        '#4CB050',
        '#8BC24A',
        '#CDDC39',
        '#FFEC3A',
        '#FFD43A',
        '#FEC207',
        '#FD9700',
        '#FD5621',
        '#FF0000',
        '#D72020'
      ],
      scale = (
        num: number,
        in_min: number,
        in_max: number,
        out_min: number,
        out_max: number
      ) => {
        return Math.round((num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
      };

    this.polylinesIri = this.surveys.map(survey => {
      const index = scale(survey.iriResult.iriScore, 0, 12, 0, 9);
      return new google.maps.Polyline({
        strokeColor: colorsBar[index],
        strokeWeight: 5,
        path: [
          new google.maps.LatLng(survey.startLatitude, survey.startLongitude),
          new google.maps.LatLng(survey.stopLatitude, survey.stopLongitude),
        ]
      });
    });

    this.polylinesIri.forEach(polyline => polyline.setMap(this.mapGraphCommunicatorService.map));
    this.mapGraphCommunicatorService.map.setCenter({ lat: this.surveys[0].startLatitude, lng: this.surveys[0].startLongitude });
  }

  protected clearIri() {
    if (this.polylinesIri.length) {
      this.polylinesIri.forEach(polyline => polyline.setMap(null));
      this.polylinesIri = [];
    }
  }

  // polylinesEvent
  polylinesEvent: google.maps.Polyline[] = [];
  protected drawEvent() {
    if (this.polylinesEvent.length === 0) {
      const colorEvent = '#800080',
        surveysEvent = this.surveys.filter(survey => survey.eventNo !== null);

      this.polylinesEvent = surveysEvent.map(survey => {
        return new google.maps.Polyline({
          strokeColor: colorEvent,
          strokeWeight: 5,
          path: [
            new google.maps.LatLng(survey.startLatitude, survey.startLongitude),
            new google.maps.LatLng(survey.stopLatitude, survey.stopLongitude),
          ]
        });
      });

      this.polylinesEvent.forEach(polyline => polyline.setMap(this.mapGraphCommunicatorService.map));
    }
  }

  protected clearEvent() {
    if (this.polylinesEvent.length) {
      this.polylinesEvent.map(polyline => polyline.setMap(null));
      this.polylinesEvent = [];
    }
  }

  // polylinesSpeed
  polylinesSpeedNotAllowed: google.maps.Polyline[] = [];
  protected drawSpeedNotAllowed() {
    if (this.polylinesSpeedNotAllowed.length === 0) {
      const colorSpeedNotAllowed = '#295fa6',
        minSpeed = 10,
        maxSpeed = 20,
        surveysSpeedNotAllowed = this.surveys.filter(survey => (+survey.speed < minSpeed) || (+survey.speed > maxSpeed));

      this.polylinesSpeedNotAllowed = surveysSpeedNotAllowed.map(survey => {
        return new google.maps.Polyline({
          strokeColor: colorSpeedNotAllowed,
          strokeWeight: 5,
          path: [
            new google.maps.LatLng(survey.startLatitude, survey.startLongitude),
            new google.maps.LatLng(survey.stopLatitude, survey.stopLongitude),
          ]
        });
      });

      this.polylinesSpeedNotAllowed.forEach(polyline => polyline.setMap(this.mapGraphCommunicatorService.map));
    }
  }

  protected clearSpeedNotAllowed() {
    if (this.polylinesSpeedNotAllowed.length) {
      this.polylinesSpeedNotAllowed.map(polyline => polyline.setMap(null));
      this.polylinesSpeedNotAllowed = [];
    }
  }

  clearAll() {
    this.clearIri();
    this.clearEvent();
    this.clearSpeedNotAllowed();
  }
}