import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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
    const params = new HttpParams().set('time', (new Date()).toISOString());
    return this.httpClient.get<SurveyTrack[]>(`${this.url}/survey-summary-service/surveySummaries/${id}/tracks`, { params });
  }

  getAvgSurveyTracks(id: string | number) {
    const params = new HttpParams().set('time', (new Date()).toISOString());
    return this.httpClient.get<SurveyTrack[]>(`${this.url}/survey-summary-service/surveySummaries/${id}/tracks/avg`, { params });
    // return this.httpClient.get<SurveyTrack[]>('http://localhost:4200/assets/test/avg-dumy.json');
  }

  retrieveAllSurveySummaries() {
    return this.httpClient.get<SurveySummary[]>(`${this.url}/survey-summary-service/surveySummaries`);
  }
}