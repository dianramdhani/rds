import { SurveyTrack } from '@data/scheme/survey-track';
import { MapGraphCommunicatorService } from '@shared/service/map-graph-communicator.service';

export class IriDrawer {
    private polylines: google.maps.Polyline[];
    private readonly colorsBar = [
        '#4CB050',
        '#8BC24A',
        '#CDDC39',
        '#FFEC3A',
        '#FFD43A',
        '#FEC207',
        '#FD9700',
        '#FD5621',
        '#FF0000',
        '#D72020'
    ]

    constructor(
        private surveys: SurveyTrack[],
        private mapGraphCommunicatorService: MapGraphCommunicatorService
    ) {
        this.polylines = this.surveys.map(survey => {
            const index = this.scale(survey.iriResult.iriScore, 0, 12, 0, 9),
                polyline = new google.maps.Polyline({
                    strokeColor: this.colorsBar[index],
                    strokeWeight: 5,
                    path: [
                        new google.maps.LatLng(survey.startLatitude, survey.startLongitude),
                        new google.maps.LatLng(survey.stopLatitude, survey.stopLongitude),
                    ]
                });

            polyline.addListener('mouseover', (e: google.maps.MouseEvent) => {
                this.mapGraphCommunicatorService.drawMapPopup(survey, e.latLng.lat(), e.latLng.lng(), false);
            });
            polyline.addListener('mouseout', () => {
                this.mapGraphCommunicatorService.removeMapPopup();
            });

            return polyline;
        });

        this.draw();
    }

    private scale(
        num: number,
        in_min: number,
        in_max: number,
        out_min: number,
        out_max: number
    ) {
        return Math.round((num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
    };

    private draw() {
        this.polylines.forEach(polyline => polyline.setMap(this.mapGraphCommunicatorService.map));
        this.mapGraphCommunicatorService.map.setCenter({ lat: this.surveys[0].startLatitude, lng: this.surveys[0].startLongitude });
    }

    remove() {
        this.polylines.forEach(polyline => polyline.setMap(null));
    }
}