import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MapGraphCommunicatorService } from '@shared/service/map-graph-communicator.service';
import { SurveyTrack } from '@data/scheme/survey-track';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: true }) mapEl: ElementRef;
  @ViewChild('legend', { static: true }) legendEl: ElementRef;
  surveys: SurveyTrack[] = [];
  // http://eyetracking.upol.cz/color/
  colorsBar = [
    '#3bd100',
    '#55cc00',
    '#7dbf00',
    '#9baf00',
    '#b39f00',
    '#cd8600',
    '#dd7200',
    '#eb5900',
    '#f63b00',
    '#fa2a00'
  ];
  protected infoWindowClick = new google.maps.InfoWindow();

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
        this.mapGraphCommunicatorService.map = new google.maps.Map(this.mapEl.nativeElement, { zoom: 16 });
        this.mapGraphCommunicatorService.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.legendEl.nativeElement);
        if (this.surveys.length) {
          this.mapGraphCommunicatorService.map.setCenter({ lat: this.surveys[0].startLatitude, lng: this.surveys[0].startLongitude });

          for (const i in this.surveys) {
            this.drawer(this.surveys[i]);
          }
        }
      });
  }

  protected drawer(survey: SurveyTrack) {
    const scale = (
      num: number,
      in_min: number,
      in_max: number,
      out_min: number,
      out_max: number
    ) => {
      return Math.round((num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
    };

    // drawer infoWindow
    const infoWindowHover = new google.maps.InfoWindow(),
      setContentInfoWindow = (
        lat: number,
        lng: number,
        _infoWindow: google.maps.InfoWindow
      ) => {
        const content = `
        <ul>
            <li>
                <strong>IRI: </strong>${survey.iriResult.iriScore}
            </li>
            <li>
                <strong>Latitude: </strong>${lat}
            </li>
            <li>
                <strong>Longitude: </strong>${lng}
            </li>
        </ul>
        `;
        _infoWindow.setContent(content);
        _infoWindow.setPosition({ lat, lng });
        _infoWindow.open(this.mapGraphCommunicatorService.map);
      };

    // drawer polyline
    const index = scale(survey.iriResult.iriScore, 0, 12, 0, 9),
      polyline = new google.maps.Polyline({
        strokeColor: this.colorsBar[index],
        strokeWeight: 5,
        path: [
          new google.maps.LatLng(survey.startLatitude, survey.startLongitude),
          new google.maps.LatLng(survey.stopLatitude, survey.stopLongitude),
        ]
      });
    polyline.addListener('mouseover', (e: google.maps.MouseEvent) => {
      setContentInfoWindow(e.latLng.lat(), e.latLng.lng(), infoWindowHover);
    });
    polyline.addListener('mouseout', () => {
      infoWindowHover.close();
    });
    polyline.addListener('click', (e: google.maps.MouseEvent) => {
      this.infoWindowClick.close();
      setContentInfoWindow(e.latLng.lat(), e.latLng.lng(), this.infoWindowClick);
    });
    polyline.setMap(this.mapGraphCommunicatorService.map);
  }
}