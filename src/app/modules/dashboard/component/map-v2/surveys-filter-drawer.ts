import { SurveyTrack } from '@data/scheme/survey-track';
import { MapGraphCommunicatorService } from '@shared/service/map-graph-communicator.service';

export class SurveysFilterDrawer {
    private polylines: google.maps.Polyline[];

    constructor(
        private surveys: SurveyTrack[],
        private strokeColor: string,
        private mapGraphCommunicatorService: MapGraphCommunicatorService
    ) {
        this.polylines = this.surveys.map(survey => {
            const polyline = new google.maps.Polyline({
                strokeColor: this.strokeColor,
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
    }

    draw() {
        this.polylines.forEach(polyline => polyline.setMap(this.mapGraphCommunicatorService.map));
    }

    remove() {
        this.polylines.forEach(polyline => polyline.setMap(null));
    }
}