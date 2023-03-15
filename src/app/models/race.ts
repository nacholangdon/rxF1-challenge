import { Circuit } from "./circuit";

export interface Race {
  Circuit: Circuit,
  date: string,
  raceName: string,
  round: string,
  season: string,
  time: string,
  url: string
}
