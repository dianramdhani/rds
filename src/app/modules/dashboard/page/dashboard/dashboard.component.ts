import { Component, OnInit } from '@angular/core';

import { Trip } from '@data/scheme/trip';
import { Subject } from 'rxjs';
import { TripByTrack } from '@data/scheme/trip-by-track';
import { TripService } from '@data/service/trip.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  trips = new Subject<TripByTrack[]>();

  constructor(
    private tripService: TripService
  ) { }

  ngOnInit() {
  }

  selectTrip(trip: Trip) {
    this.tripService.getTripByTrack(trip.id).subscribe(trips => this.trips.next(trips));
  }
}