import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { SurveySummaryService } from '@data/service/survey-summary.service';
import { SurveySummary } from '@data/scheme/survey-summary';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {
  @Output('selectSurvey') _selectSurvey = new EventEmitter<SurveySummary>()
  surveys: SurveySummary[] = [];
  surveyIndexSelected: number;
  surveySelected: SurveySummary;

  constructor(
    private surveySummaryService: SurveySummaryService
  ) { }

  ngOnInit() {
    this.surveySummaryService.retrieveAllSurveySummaries()
      .subscribe(res => {
        this.surveys = res;
      });
  }

  selectSurvey(survey: SurveySummary, index: number, event: Event) {
    this.surveyIndexSelected = index;
    this._selectSurvey.emit(survey);
    console.log(survey);
    this.surveySelected = survey;
  }
}