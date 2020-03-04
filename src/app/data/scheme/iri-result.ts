import { SurveySummary } from './survey-summary';

export class IriResult {
    id: string | number;
    startLatitude: number;
    startLongitude: number;
    stopLatitude: number;
    stopLongitude: number;
    iriScore: number;
    distance: number;
    surveySummary: SurveySummary
}