import { Driver } from "./driver";
import { Constructor } from "./constructor";

export interface DriverStandings {
  Constructors: Constructor[],
  Driver: Driver,
  points: string,
  position: string,
  positionText: string,
  wins: string,
}
