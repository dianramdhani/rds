import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { SurveySummaryService } from '@data/service/survey-summary.service';
import { SurveySummary } from '@data/scheme/survey-summary';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit, OnDestroy {
  surveys: SurveySummary[] = [];
  surveySelected: SurveySummary;

  // datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(
    private surveySummaryService: SurveySummaryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
      order: [[2, 'desc']]
    };

    this.surveySummaryService.retrieveAllSurveySummaries()
      .subscribe(surveys => {
        this.surveys = surveys;
        this.dtTrigger.next();

        try {
          const surveySummaryId = +this.route.firstChild.snapshot.params.surveySummaryId;
          this.surveySelected = this.surveys.find(survey => survey.id === surveySummaryId);
        } catch (error) {
        }
      });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  selectSurvey(survey: SurveySummary, event: Event) {
    this.surveySelected = survey;
  }
}