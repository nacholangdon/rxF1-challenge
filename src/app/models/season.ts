import { ApiResponse } from "./api-response";
import { RaceTable } from "./race-table";

export interface Season extends ApiResponse {
  RaceTable: RaceTable
}
