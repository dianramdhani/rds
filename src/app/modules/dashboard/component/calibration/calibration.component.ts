import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IriCalibrationService } from '@data/service/iri-calibration.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Calibration } from '@data/scheme/calibration';

@Component({
  selector: 'app-calibration',
  templateUrl: './calibration.component.html',
  styleUrls: ['./calibration.component.scss']
})
export class CalibrationComponent implements OnInit {
  @Output('refreshSurvey') refreshSurvey = new EventEmitter();
  showEdit = false;
  lastCalibration: Calibration;
  formCalibration: FormGroup;

  constructor(
    private iriCalibrationService: IriCalibrationService
  ) { }

  async ngOnInit() {
    this.lastCalibration = await this.iriCalibrationService.retrieveCalibration(1).toPromise();
    this.formCalibration = new FormGroup({
      a1: new FormControl(this.lastCalibration.a1, Validators.required),
      a2: new FormControl(this.lastCalibration.a2, Validators.required)
    });
  }

  async calibrate() {
    const { a1, a2 } = this.formCalibration.value;
    await this.iriCalibrationService.saveCalibration(a1, a2).toPromise();
    await this.ngOnInit();
    setTimeout(() => this.refreshSurvey.emit(), 50);
    this.showEdit = false;
  }
}