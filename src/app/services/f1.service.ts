import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, forkJoin, map, tap } from 'rxjs';

import { Race } from '../models/race';
import { Driver } from '../models/driver';
import { RaceTable } from '../models/race-table';
import { ApiResponse } from '../models/api-response';
import { StatusTable } from '../models/status-table';
import { StandingsTable } from '../models/standings-table';
import { SeasonsResponse } from '../models/seasons-response';
import { DriverStandings } from '../models/driver-standings';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class F1Service {

  private API_URL = 'http://ergast.com/api/f1/';
  private SEASONS = [2018,2019,2020,2021,2022];
  private RESPONSE_TYPE = '.json';

  private _seasonsSubject: BehaviorSubject<SeasonsResponse> = new BehaviorSubject({} as SeasonsResponse);
  public readonly storedSeasons$: Observable<ApiResponse<RaceTable>[]> = this._seasonsSubject.asObservable().pipe(
    map(response => Object.values(response))
  );

  constructor(private httpClient: HttpClient) { }

  public getSeasons(): Observable<SeasonsResponse> {
    const requests = {};
    this.SEASONS.forEach((season: number) => {
      Object.assign(requests, {[season]: this.httpClient.get<ApiResponse<RaceTable>>(`${this.API_URL}${season}${this.RESPONSE_TYPE}`)});
    })
    // Do I need to store the response?
    return forkJoin(requests).pipe(
      tap((response: SeasonsResponse) => {
        this._seasonsSubject.next(response);
      })
    );
  }

  public getDriversPerSeason(season: string): Observable<Driver[]> {
    return this.httpClient.get<ApiResponse<RaceTable>>(`${this.API_URL}${season}/drivers${this.RESPONSE_TYPE}`).pipe(
      map((response: any) => response.MRData['DriverTable'].Drivers),
    );
  }

  public getDriverStandingsPerSeason(season: string, round: string): Observable<DriverStandings[]> {
    return this.httpClient.get<ApiResponse<StandingsTable>>(`${this.API_URL}${season}/${round}/driverStandings${this.RESPONSE_TYPE}`).pipe(
      map((response: ApiResponse<StandingsTable>) => {
        return response.MRData['StandingsTable'].StandingsLists[0].DriverStandings as DriverStandings[];
      })
    );
  }

  public getFinishingStatusPerRace(season: string, round: string): Observable<Status[]> {
    return this.httpClient.get<ApiResponse<StatusTable>>(`${this.API_URL}${season}/${round}/status${this.RESPONSE_TYPE}`).pipe(
      map((response: ApiResponse<StatusTable>) => {
        return response.MRData['StatusTable'].Status;
      })
    );
  }

  public getSeason(year: string): Observable<Race[]> {
    return this.storedSeasons$.pipe(
      map((response: ApiResponse<RaceTable>[]) => {
        const season = response.find(season => season.MRData['RaceTable'].season === year);
        return season?.MRData['RaceTable'].Races as Race[];
      }));
  }



}
