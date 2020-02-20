import { Iri } from './iri'

export class TripByTrack {
    startLatitude: number;
    startLongitude: number;
    stopLatitude: number;
    stopLongitude: number;
    interval: number;
    altitude: number;
    iri: Iri
}