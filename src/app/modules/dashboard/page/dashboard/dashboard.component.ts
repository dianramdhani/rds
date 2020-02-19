import { Component, OnInit } from '@angular/core';

import { Trip } from '@data/scheme/trip';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tripSelected = new Subject<Trip>();

  constructor() { }

  ngOnInit() {
  }

  selectTrip(trip: Trip) {
    console.log(trip);
    this.tripSelected.next(trip);
  }
}