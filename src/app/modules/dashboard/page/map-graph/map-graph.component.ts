import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SurveyTypes, MapGraphCommunicatorService } from '@shared/service/map-graph-communicator.service';
import { SurveySummaryService } from '@data/service/survey-summary.service';

@Component({
  selector: 'app-map-graph',
  templateUrl: './map-graph.component.html',
  styleUrls: ['./map-graph.component.scss']
})
export class MapGraphComponent implements OnInit {
  surveySummaryId: number | string;
  surveyTypes = SurveyTypes;
  surveyTypeSelected: number;
  showLoading = false;

  constructor(
    private route: ActivatedRoute,
    private surveySummaryService: SurveySummaryService,
    private mapGraphCommunicatorService: MapGraphCommunicatorService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.surveySummaryId !== 'null') {
        this.surveySummaryId = params.surveySummaryId;
        this.selectSurvey(this.surveyTypes.average);
      }
    });
  }

  selectSurvey(surveyType: number) {
    this.surveyTypeSelected = surveyType;

    this.showLoading = true;
    switch (this.surveyTypeSelected) {
      case this.surveyTypes.actual:
        this.surveySummaryService.getSurveyTracks(this.surveySummaryId)
          .subscribe(surveys => {
            this.mapGraphCommunicatorService.lastSurveys.next(surveys);
            this.showLoading = false;
          });
        break;

      case this.surveyTypes.average:
        this.surveySummaryService.getAvgSurveyTracks(this.surveySummaryId)
          .subscribe(surveys => {
            this.mapGraphCommunicatorService.lastSurveys.next(surveys);
            this.showLoading = false;
          });
        break;
    }
  }
}