import { Component, OnInit } from '@angular/core';

import { MapGraphCommunicatorService } from '@shared/service/map-graph-communicator.service';
import { SurveySummaryService } from '@data/service/survey-summary.service';
import { SurveySummary } from '@data/scheme/survey-summary';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private surveySummaryService: SurveySummaryService,
    private mapGraphCommunicatorService: MapGraphCommunicatorService
  ) { }

  ngOnInit() {
  }

  selectSurvey(survey: SurveySummary) {
    this.mapGraphCommunicatorService.lastSurveys.next([]);
    this.surveySummaryService.getSurveyTracks(survey.id)
      .subscribe(surveys => this.mapGraphCommunicatorService.lastSurveys.next(surveys));
  }
}