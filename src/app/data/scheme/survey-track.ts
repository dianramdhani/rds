import { IriResult } from './iri-result'

export class SurveyTrack {
    startLatitude: number;
    startLongitude: number;
    stopLatitude: number;
    stopLongitude: number;
    altitude: number;
    interval: number;
    accelerometer: number;
    iriResult: IriResult
}