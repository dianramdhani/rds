import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Subject } from 'rxjs';

import { TripByTrack } from '@data/scheme/trip-by-track';
import { TripService } from '@data/service/trip.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  @ViewChild('chart', { static: true }) chartEl: ElementRef;
  chart: Chart;
  trips: TripByTrack[];

  constructor(
    private tripService: TripService
  ) { }

  ngOnInit() {
    this.tripService.lastTrips
      .subscribe(trips => {
        console.log(trips, 'ini di graph');
        this.trips = trips;
        if (this.trips.length) {
          this.chartDrawer();
        }
      });
  }

  protected chartDrawer() {
    if (this.chart) {
      this.chart.clear();
    }

    const data: Chart.ChartData = {
      labels: this.trips.map((_, index) => {
        if (index) {
          const tempTrips = this.trips.slice(),
            splice = tempTrips.splice(0, index),
            intervals = splice.map(trip => trip.interval),
            reduce = intervals.reduce((accumulator, currentValue) => accumulator + currentValue);
          return reduce.toString();
        } else {
          return '0';
        }
      }),
      datasets: [
        {
          label: 'IRI',
          yAxisID: 'iri',
          backgroundColor: '#007bff',
          borderColor: '#007bff',
          data: this.trips.map(trip => trip.iri.iriScore),
          fill: false
        },
        {
          label: 'Altitude',
          yAxisID: 'altitude',
          backgroundColor: '#dc3545',
          borderColor: '#dc3545',
          data: this.trips.map(trip => trip.altitude),
          fill: false
        }
      ]
    };
    this.chart = new Chart(this.chartEl.nativeElement, {
      type: 'line',
      data,
      options: {
        tooltips: {
          mode: 'index',
          custom: (tootip) => {
            if (tootip.dataPoints) {
              console.log(tootip.dataPoints);
              console.log(this.tripService.map);
            }
          }
        },
        scales: {
          yAxes: [
            {
              id: 'iri',
              type: 'linear',
              position: 'left',
              ticks: { fontColor: '#007bff' }
            },
            {
              id: 'altitude',
              type: 'linear',
              position: 'right',
              ticks: { fontColor: '#dc3545' }
            }
          ]
        }
      }
    });
  }
}