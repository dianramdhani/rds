import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {
  @ViewChild('chart', { static: true }) chartEl: ElementRef;
  chart: Chart;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.chart = new Chart(
      this.chartEl.nativeElement,
      {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
          }]
        },

        // Configuration options go here
        options: {}
      }
    );
  }
}