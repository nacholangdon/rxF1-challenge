import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, forkJoin, map, tap } from 'rxjs';

import { Race } from '../models/race';
import { Driver } from '../models/driver';
import { RaceTable } from '../models/race-table';
import { ApiResponse } from '../models/api-response';
import { SeasonsResponse } from '../models/seasons-response';

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

  getSeasons(): Observable<SeasonsResponse> {
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

  getDrivers(season: string): Observable<Driver[]> {
    return this.httpClient.get<ApiResponse<RaceTable>>(`${this.API_URL}${season}/drivers${this.RESPONSE_TYPE}`).pipe(
      map((response: any) => response.MRData['DriverTable'].Drivers),
    );
  }

  getSeason(year: string): Observable<Race[]> {
    return this.storedSeasons$.pipe(
      map((response: ApiResponse<RaceTable>[]) => {
        const season = response.find(season => season.MRData['RaceTable'].season === year);
        return season?.MRData['RaceTable'].Races as Race[];
      }));
  }

}
