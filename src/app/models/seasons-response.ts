import { RaceTable } from "./race-table";
import { MRData } from "./mr-data";

export interface SeasonsResponse {
  [year: number]: MRData<RaceTable>
}
