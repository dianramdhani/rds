import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

import { MapGraphCommunicatorService } from '@shared/service/map-graph-communicator.service';
import { SurveysFilterDrawer } from './surveys-filter-drawer';
import { IriDrawer } from './iri-drawer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SurveyTrack } from '@data/scheme/survey-track';

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

  // formConfig
  formConfig: FormGroup;
  surveys: SurveyTrack[];

  showData = false;
  showConfig = false;

  constructor(
    private mapGraphCommunicatorService: MapGraphCommunicatorService
  ) { }

  ngOnInit() {
    this.mapGraphCommunicatorService.map = new google.maps.Map(this.mapEl.nativeElement, {
      zoom: 15,
      center: new google.maps.LatLng({ lat: -6.899514, lng: 107.6137633 }),
      mapTypeControlOptions: {
        mapTypeIds: [
          'focusToData',
          'roadmap',
          'terrain',
        ]
      }
    });
    this.changeMapStyle();
    this.mapGraphCommunicatorService.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.legendEl.nativeElement);
    this.mapGraphCommunicatorService.map.controls[google.maps.ControlPosition.LEFT_TOP].push(this.layerSelectorEl.nativeElement);

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

    // formConfig
    this.formConfig = new FormGroup({
      minSpeed: new FormControl(40, Validators.required),
      maxSpeed: new FormControl(60, Validators.required)
    });

    this.mapGraphCommunicatorService.lastSurveys
      .subscribe(surveys => {
        if (this.iriDraw) {
          this.iriDraw.remove();
          this.eventDraw.remove();
          this.speedInvalidDraw.remove();
        }

        const
          surveysEvent = surveys.filter(survey => survey.eventNo !== null);
        this.eventDraw = new SurveysFilterDrawer(surveysEvent, '#800080', 100, this.mapGraphCommunicatorService);

        this.surveys = surveys;
        this.updateInvalidSpeed();

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
        this.showConfig = true;
      } else {
        this.speedInvalidDraw.remove();
        this.showConfig = false;
      }
    } else {
      this.eventDraw.remove();
      this.speedInvalidDraw.remove();
    }
  }

  updateInvalidSpeed() {
    const { minSpeed, maxSpeed } = this.formConfig.value;

    if (minSpeed >= maxSpeed) {
      alert('INVALID CONFIG. Minimum speed must be lower than maximum speed!');
      return;
    }

    const surveysSpeedNotAllowed = this.surveys.filter(survey => (survey.speed < minSpeed) || (survey.speed > maxSpeed));
    if (this.speedInvalidDraw) {
      this.speedInvalidDraw.update(surveysSpeedNotAllowed);
    } else {
      this.speedInvalidDraw = new SurveysFilterDrawer(surveysSpeedNotAllowed, '#295fa6', 50, this.mapGraphCommunicatorService);
    }

    this.changeLayers();
  }

  changeMapStyle() {
    const
      styles: google.maps.MapTypeStyle[] = [
        {
          "featureType": "administrative",
          "stylers": [
            {
              "saturation": -100
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": 65
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": 50
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road",
          "stylers": [
            {
              "saturation": -100
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "stylers": [
            {
              "lightness": 30
            }
          ]
        },
        {
          "featureType": "road.highway",
          "stylers": [
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road.local",
          "stylers": [
            {
              "lightness": 40
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "hue": "#ffff00"
            },
            {
              "saturation": -97
            },
            {
              "lightness": -25
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": -25
            }
          ]
        }
      ],
      styledMapType = new google.maps.StyledMapType(styles, { name: 'Highlight Data' });
    this.mapGraphCommunicatorService.map.mapTypes.set('focusToData', styledMapType);
    this.mapGraphCommunicatorService.map.setMapTypeId('focusToData');
  }
}