import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Calibration } from '@data/scheme/calibration';

@Injectable({
  providedIn: 'root'
})
export class IriCalibrationService {
  protected url: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = window['config']().api;
  }

  retrieveCalibration(id: string | number) {
    const params = new HttpParams().set('time', (new Date()).toISOString());
    return this.httpClient.get<Calibration>(`${this.url}/iri-calibration-service/iriCalibrations/${id}`, { params });
  }

  saveCalibration(a1: number, a2: number) {
    return this.httpClient.post(`${this.url}/iri-calibration-service/iriCalibrations`, { a1, a2 });
  }
}
