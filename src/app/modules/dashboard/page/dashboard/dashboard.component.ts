import { Component, OnInit } from '@angular/core';

import { MapGraphCommunicatorService, SurveyType } from '@shared/service/map-graph-communicator.service';
import { SurveySummaryService } from '@data/service/survey-summary.service';
import { SurveySummary } from '@data/scheme/survey-summary';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lastSurveySelected: SurveySummary;
  surveyType = SurveyType;
  surveyTypeSelected: number = this.surveyType.average;
  showLoading = false;

  constructor(
    private surveySummaryService: SurveySummaryService,
    private mapGraphCommunicatorService: MapGraphCommunicatorService
  ) { }

  ngOnInit() {
  }

  selectSurvey(survey: SurveySummary) {
    this.lastSurveySelected = survey;
    this.mapGraphCommunicatorService.lastSurveys.next([]);
    this.showLoading = true;

    switch (this.surveyTypeSelected) {
      case this.surveyType.actual:
        this.surveySummaryService.getSurveyTracks(this.lastSurveySelected.id)
          .subscribe(surveys => {
            this.mapGraphCommunicatorService.lastSurveys.next(surveys);
            this.showLoading = false;
          });
        break;

      case this.surveyType.average:
        this.surveySummaryService.getAvgSurveyTracks(this.lastSurveySelected.id)
          .subscribe(surveys => {
            this.mapGraphCommunicatorService.lastSurveys.next(surveys);
            this.showLoading = false;
          });
        break;
    }
  }

  changeSurveyType(surveyType: number) {
    this.surveyTypeSelected = surveyType;
    this.selectSurvey(this.lastSurveySelected);
  }
}