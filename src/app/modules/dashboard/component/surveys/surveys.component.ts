import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { SurveySummaryService } from '@data/service/survey-summary.service';
import { SurveySummary } from '@data/scheme/survey-summary';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit, OnDestroy {
  @Output('selectSurvey') _selectSurvey = new EventEmitter<SurveySummary>()
  surveys: SurveySummary[] = [];
  surveyIndexSelected: number;
  surveySelected: SurveySummary;

  // datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(
    private surveySummaryService: SurveySummaryService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
      order: [[2, 'desc']]
    };

    this.surveySummaryService.retrieveAllSurveySummaries()
      .subscribe(res => {
        this.surveys = res;
        this.dtTrigger.next();
      });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  selectSurvey(survey: SurveySummary, index: number, event: Event) {
    this.surveyIndexSelected = index;
    this._selectSurvey.emit(survey);
    this.surveySelected = survey;
  }
}