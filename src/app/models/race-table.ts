import { Race } from "./race";

export interface RaceTable {
   Races: Race[],
   round?: string,
   season?: string
}
