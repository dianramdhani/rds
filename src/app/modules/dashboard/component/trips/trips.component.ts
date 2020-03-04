import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Trip } from '@data/trip-scheme/trip';
import { TripService } from '@data/trip-service/trip.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  @Output('selectTrip') _selectTrip = new EventEmitter<Trip>()
  trips: Trip[] = [];
  tripIndexSelected: number;

  constructor(
    private tripService: TripService
  ) { }

  ngOnInit() {
    this.tripService.retrieveAllSurveySummaries()
      .subscribe(res => {
        console.log(res);
        this.trips = res;
      });
  }

  selectTrip(trip: Trip, index: number, event: Event) {
    console.log(trip, event);
    this.tripIndexSelected = index;
    this._selectTrip.emit(trip);
  }
}