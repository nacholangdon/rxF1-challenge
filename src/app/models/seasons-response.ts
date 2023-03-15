import { MRData } from "./mr-data";

export interface SeasonsResponse {
  [year: number]: MRData;
}

export interface SeasonsResponse2 {
  MRData: MRData;
}
