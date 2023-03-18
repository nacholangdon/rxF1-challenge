import { DriverStandings } from './driver-standings';

export interface StandingsList {
   DriverStandings: DriverStandings[],
   round: string,
   season: string
}
