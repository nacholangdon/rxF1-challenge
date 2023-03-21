import { StatusTable } from "./status-table";

export interface FinishingStatusResponse {
  MRData: {
    StatusTable: StatusTable,
    season: string,
    limit: string,
    offset: string,
    series: string,
    total: string,
    url: string,
    xmlns: string
  }
}
