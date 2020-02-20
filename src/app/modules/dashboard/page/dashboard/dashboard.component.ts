import { Component, OnInit } from '@angular/core';

import { Trip } from '@data/scheme/trip';
import { Subject } from 'rxjs';
import { TripByTrack } from '@data/scheme/trip-by-track';
import { TripService } from '@data/service/trip.service';
import { MapGraphCommunicatorService } from '@shared/service/map-graph-communicator.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  trips = new Subject<TripByTrack[]>();
  map: google.maps.Map;

  constructor(
    private tripService: TripService,
    private mapGraphCommunicatorService: MapGraphCommunicatorService
  ) { }

  ngOnInit() {
    console.log(this.map);
  }

  selectTrip(trip: Trip) {
    this.tripService.getTripByTrack(trip.id).subscribe(trips => this.mapGraphCommunicatorService.lastTrips.next(trips));
  }
}