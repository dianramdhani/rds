import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Subject } from 'rxjs';

import { TripByTrack } from '@data/scheme/trip-by-track';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  @Input('trips') getterTrips: Subject<TripByTrack[]>;
  @ViewChild('chart', { static: true }) chartEl: ElementRef;
  chart: Chart;
  trips: TripByTrack[];

  constructor() { }

  ngOnInit() {
    this.getterTrips
      .subscribe(trips => {
        console.log(trips, 'ini di graph');
        this.trips = trips;
        if (this.trips.length) {
          this.chartDrawer();
        }
      });
  }

  protected chartDrawer() {
    const data: Chart.ChartData = {
      labels: this.trips.map((_, index) => {
        if (index) {
          const tempTrips = this.trips.slice(),
            splice = tempTrips.splice(0, index),
            distances = splice.map(trip => trip.iri.distance),
            reduce = distances.reduce((accumulator, currentValue) => accumulator + currentValue);
          return reduce.toString();
        } else {
          return '0';
        }
      }),
      datasets: [{
        label: 'IRI',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: this.trips.map(trip => trip.iri.iriScore)
      }]
    };
    this.chart = new Chart(this.chartEl.nativeElement, {
      type: 'line',
      data
    });
  }
}