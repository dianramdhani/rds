import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SurveyTrack } from '@data/scheme/survey-track';
import { SurveySummary } from '@data/scheme/survey-summary';

@Injectable({
  providedIn: 'root'
})
export class SurveySummaryService {
  protected url: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = window['config']().api;
  }

  getSurveyTracks(id: string | number) {
    return this.httpClient.get<SurveyTrack[]>(`${this.url}/survey-summary-service/surveySummaries/${id}/tracks`);
  }


  getAvgSurveyTracks(id: string | number) {
    return this.httpClient.get<SurveyTrack[]>(`${this.url}/survey-summary-service/surveySummaries/${id}/tracks/avg`);
  }

  retrieveAllSurveySummaries() {
    return this.httpClient.get<SurveySummary[]>(`${this.url}/survey-summary-service/surveySummaries`);
  }
}