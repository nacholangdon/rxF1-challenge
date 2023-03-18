import { StandingsList } from './standings-list';

export interface StandingsTable {
   StandingsLists: StandingsList[],
   round: string,
   season: string
}
