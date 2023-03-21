import { RaceTable } from "./race-table";
import { StandingsTable } from "./standings-table";

export interface DriverStandingsResponse {
  MRData: {
    StandingsTable: StandingsTable,
    season: string,
    limit: string,
    offset: string,
    series: string,
    total: string,
    url: string,
    xmlns: string
  }
}
