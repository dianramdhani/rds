import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart } from 'chart.js';

import { MapGraphCommunicatorService } from '@shared/service/map-graph-communicator.service';
import { SurveyTrack } from '@data/scheme/survey-track';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  @ViewChild('chart', { static: true }) chartEl: ElementRef;
  chart: Chart;
  surveys: SurveyTrack[];

  constructor(
    private mapGraphCommunicatorService: MapGraphCommunicatorService
  ) { }

  ngOnInit() {
    this.mapGraphCommunicatorService.lastSurveys
      .subscribe(surveys => {
        if (!this.chart) {
          this.chartInit();
        }

        this.surveys = surveys;
        if (this.surveys.length) {
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
              this.mapGraphCommunicatorService.drawMapPopup(this.surveys[tootip.dataPoints[0].index]);
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
              id: 'accelerometer',
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
      labels: this.surveys.map((_, index) => {
        if (index) {
          const tempSurveys = this.surveys.slice(),
            splice = tempSurveys.splice(0, index),
            intervals = splice.map(survey => survey.interval),
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
          data: this.surveys.map(survey => survey.iriResult.iriScore),
          fill: false
        },
        {
          label: 'Accelerometer',
          yAxisID: 'accelerometer',
          backgroundColor: '#dc3545',
          borderColor: '#dc3545',
          data: this.surveys.map(survey => survey.accelerometer),
          fill: false
        }
      ]
    };
    this.chart.data = data;
    this.chart.update();
  }
}