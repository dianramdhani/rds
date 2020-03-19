import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

import { SurveyTrack } from '@data/scheme/survey-track';
import { MapGraphCommunicatorService } from '@shared/service/map-graph-communicator.service';
import { SurveysFilterDrawer } from './surveys-filter-drawer';
import { IriDrawer } from './iri-drawer';

@Component({
  selector: 'app-map-v2',
  templateUrl: './map-v2.component.html',
  styleUrls: ['./map-v2.component.scss']
})
export class MapV2Component implements OnInit {
  @ViewChild('map', { static: true }) mapEl: ElementRef;
  @ViewChild('legend', { static: true }) legendEl: ElementRef;
  @ViewChild('layerSelector', { static: true }) layerSelectorEl: ElementRef;

  // IriDrawer
  iriDraw: IriDrawer;

  // SurveysFilterDrawer
  eventDraw: SurveysFilterDrawer;
  speedInvalidDraw: SurveysFilterDrawer;

  // select2
  layers: Array<Select2OptionData>;
  options: Options;
  layerSelected: string[];

  showData = false;

  constructor(
    private mapGraphCommunicatorService: MapGraphCommunicatorService
  ) { }

  ngOnInit() {
    this.mapGraphCommunicatorService.map = new google.maps.Map(this.mapEl.nativeElement, {
      zoom: 15,
      center: new google.maps.LatLng({ lat: -6.899514, lng: 107.6137633 })
    });
    this.mapGraphCommunicatorService.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.legendEl.nativeElement);
    this.mapGraphCommunicatorService.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(this.layerSelectorEl.nativeElement);

    // select2
    this.layers = [
      {
        id: 'event',
        text: 'Event'
      },
      {
        id: 'speedNotAllowed',
        text: 'Invalid Speed'
      }
    ];
    this.layerSelected = ['event'];
    this.options = {
      width: '135',
      multiple: true,
      tags: true
    };

    this.mapGraphCommunicatorService.lastSurveys
      .subscribe(surveys => {
        const
          surveysEvent = surveys.filter(survey => survey.eventNo !== null);
        this.eventDraw = new SurveysFilterDrawer(surveysEvent, '#800080', this.mapGraphCommunicatorService);

        /**
         * @todo
         * minSpeed and maxSpeed can config
         */
        const minSpeed = 10,
          maxSpeed = 20,
          surveysSpeedNotAllowed = surveys.filter(survey => (+survey.speed < minSpeed) || (+survey.speed > maxSpeed));
        this.speedInvalidDraw = new SurveysFilterDrawer(surveysSpeedNotAllowed, '#295fa6', this.mapGraphCommunicatorService);

        this.iriDraw = new IriDrawer(surveys, this.mapGraphCommunicatorService);

        this.showData = true;
        this.changeLayers();
      });
  }

  changeLayers() {
    if (this.layerSelected.length) {
      const check = (id: string) => this.layerSelected.find(layer => layer === id);
      if (check('event')) {
        this.eventDraw.draw();
      } else {
        this.eventDraw.remove();
      }

      if (check('speedNotAllowed')) {
        this.speedInvalidDraw.draw();
      } else {
        this.speedInvalidDraw.remove();
      }
    } else {
      this.eventDraw.remove();
      this.speedInvalidDraw.remove();
    }
  }
}