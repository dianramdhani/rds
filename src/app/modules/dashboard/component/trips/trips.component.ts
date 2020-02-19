import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Trip } from '@data/scheme/trip';
import { TripService } from '@data/service/trip.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  @Output('selectTrip') _selectTrip = new EventEmitter<Trip>()
  trips: Trip[] = [];

  constructor(
    private tripService: TripService
  ) { }

  ngOnInit() {
    this.tripService.retrieveAllTrips()
      .subscribe(res => {
        console.log(res);
        this.trips = res;
      });
  }

  selectTrip(trip: Trip, event: Event) {
    console.log(trip);
    this._selectTrip.emit(trip);
  }
}