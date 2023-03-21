import { Circuit } from "./circuit";
import { Qualifying } from "./qualifying";

export interface Race {
  Circuit: Circuit,
  FirstPractice?: Qualifying,
  Qualifying?: Qualifying,
  SecondPractice?: Qualifying,
  ThirdPractice?: Qualifying,
  Results?: Qualifying,
  Sprint?: Qualifying,
  date: string,
  raceName: string,
  round: string,
  season: string,
  time: string,
  url: string
}
