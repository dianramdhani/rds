import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TripByTrack } from '@data/scheme/trip-by-track';
import { Trip } from '@data/scheme/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  protected url: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = window['config']().api;
  }

  getSurveyTracks(tripId: string | number) {
    return this.httpClient.get<TripByTrack[]>(`${this.url}/survey-summary-service/surveySummaries/${tripId}/tracks`);
  }

  retrieveAllSurveySummaries() {
    return this.httpClient.get<Trip[]>(`${this.url}/survey-summary-service/surveySummaries`);
  }
}