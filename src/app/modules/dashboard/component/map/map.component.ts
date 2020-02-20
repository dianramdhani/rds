import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { TripByTrack } from '@data/scheme/trip-by-track';
import { MapGraphCommunicatorService } from '@shared/service/map-graph-communicator.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: true }) mapEl: ElementRef;
  @ViewChild('legend', { static: true }) legendEl: ElementRef;
  trips: TripByTrack[] = [];
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

    this.mapGraphCommunicatorService.lastTrips
      .subscribe(trips => {
        this.trips = trips;
        this.mapGraphCommunicatorService.map = new google.maps.Map(this.mapEl.nativeElement, { zoom: 16 });
        this.mapGraphCommunicatorService.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.legendEl.nativeElement);
        if (this.trips.length) {
          this.mapGraphCommunicatorService.map.setCenter({ lat: this.trips[0].startLatitude, lng: this.trips[0].startLongitude });

          for (const i in this.trips) {
            this.drawer(this.trips[i]);
          }
        }
      });
  }

  protected drawer(trip: TripByTrack) {
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
                <strong>IRI: </strong>${trip.iri.iriScore}
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
    const index = scale(trip.iri.iriScore, 0, 12, 0, 9),
      polyline = new google.maps.Polyline({
        strokeColor: this.colorsBar[index],
        strokeWeight: 5,
        path: [
          new google.maps.LatLng(trip.startLatitude, trip.startLongitude),
          new google.maps.LatLng(trip.stopLatitude, trip.stopLongitude),
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