import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart } from 'chart.js';

import { TripByTrack } from '@data/scheme/trip-by-track';
import { MapGraphCommunicatorService } from '@shared/service/map-graph-communicator.service';

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
    private mapGraphCommunicatorService: MapGraphCommunicatorService
  ) { }

  ngOnInit() {
    this.mapGraphCommunicatorService.lastTrips
      .subscribe(trips => {
        if (!this.chart) {
          this.chartInit();
        }

        this.trips = trips;
        if (this.trips.length) {
          this.chartDrawer();
        }
      });
  }

  protected chartInit() {
    this.chart = new Chart(this.chartEl.nativeElement, {
      type: 'line',
      options: {
        responsive: false,
        tooltips: {
          mode: 'index',
          custom: (tootip) => {
            if (tootip.dataPoints) {
              this.mapGraphCommunicatorService.drawMapPopup(this.trips[tootip.dataPoints[0].index]);
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

  protected chartDrawer() {
    if (this.chart) {
      this.chart.data.labels.pop();
      this.chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
      });
      this.chart.update();
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
          data: this.trips.map(trip => trip.iriResult.iriScore),
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
    this.chart.data = data;
    this.chart.update();
  }
}