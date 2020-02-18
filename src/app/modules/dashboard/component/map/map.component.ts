import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TripService } from '@data/service/trip.service';

import { Trip } from '@data/scheme/trip';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: true }) mapEl: ElementRef;
  map: google.maps.Map;
  trips: Trip[];

  constructor(
    private tripService: TripService
  ) { }

  ngOnInit() {
    this.map = new google.maps.Map(this.mapEl.nativeElement, {
      center: new google.maps.LatLng(-6.8966657, 107.6146185),
      zoom: 10,
    });

    this.tripService.getTripByTrack(1)
      .subscribe(res => {
        this.trips = res;
        this.trips.forEach(trip => {
          // infoWindow
          const infoWindowHover = new google.maps.InfoWindow(),
            infoWindowClick = new google.maps.InfoWindow(),
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
              _infoWindow.open(this.map);
            };

          // polyline
          const polyline = new google.maps.Polyline({
            strokeColor: '#FF0000',
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
            infoWindowClick.close();
            setContentInfoWindow(e.latLng.lat(), e.latLng.lng(), infoWindowClick);
          });
          polyline.setMap(this.map);
        });
      });
  }
}