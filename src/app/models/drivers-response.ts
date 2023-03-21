import { Driver } from "./driver";
import { DriverTable } from "./driver-table";

export interface DriversResponse {
  MRData: {
    DriverTable: DriverTable,
    season: string,
    limit: string,
    offset: string,
    series: string,
    total: string,
    url: string,
    xmlns: string
  }
}
