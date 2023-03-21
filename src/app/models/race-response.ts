import { RaceTable } from "./race-table";

export interface RaceResponse {
  MRData: {
    RaceTable: RaceTable,
    season: string,
    limit: string,
    offset: string,
    series: string,
    total: string,
    url: string,
    xmlns: string
  }
}
