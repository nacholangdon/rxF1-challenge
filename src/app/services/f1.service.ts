import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { BehaviorSubject, Observable, forkJoin, map, tap } from 'rxjs';

import { Race } from '../models/race';
import { Driver } from '../models/driver';
import { Status } from '../models/status';
import { RaceResponse } from '../models/race-response';
import { SeasonResponse } from '../models/season-response';
import { SeasonsResponse } from '../models/seasons-response';
import { DriverStandings } from '../models/driver-standings';
import { DriversResponse } from '../models/drivers-response';
import { DriverStandingsResponse } from '../models/driver-standings-response';
import { FinishingStatusResponse } from '../models/finishing-status-response';

export type SeasonParam = { season: string, offset: number, limit: number };
export type DriverStandingsParam = { season: string, round: string, offset: number, limit: number };

@Injectable({
  providedIn: 'root'
})
export class F1Service {

  private readonly httpClient = inject(HttpClient);

  private API_URL = 'http://ergast.com/api/f1/';
  private SEASONS = [2018,2019,2020,2021,2022];
  private RESPONSE_TYPE = '.json';

  private _isLoadingSeasonsSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly isLoadingSeasons$: Observable<boolean> = this._isLoadingSeasonsSubject.asObservable();

  private _isLoadingDriversSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly isLoadingDrivers$: Observable<boolean> = this._isLoadingDriversSubject.asObservable();

  private _isLoadingRacesSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly isLoadingRaces$: Observable<boolean> = this._isLoadingRacesSubject.asObservable();

  private _isLoadingDriverStandingsSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly isLoadingDriverStandings$: Observable<boolean> = this._isLoadingDriverStandingsSubject.asObservable();

  private _driversCountSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public readonly driversCount$: Observable<number> = this._driversCountSubject.asObservable();

  private _racesCountSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public readonly racesCount$: Observable<number> = this._racesCountSubject.asObservable();

  private _driverStandingsCountSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public readonly driverStandingsCount$: Observable<number> = this._driverStandingsCountSubject.asObservable();

  public getSeasons(): Observable<SeasonsResponse> {
    this._isLoadingSeasonsSubject.next(true);
    const requests = {};
    this.SEASONS.forEach((year: number) => {
      Object.assign(requests, {[year]: this.httpClient.get<SeasonResponse>(`${this.API_URL}${year}${this.RESPONSE_TYPE}`)});
    })
    return forkJoin(requests).pipe(
      tap((res) => {
        console.log('response', res);
        this._isLoadingSeasonsSubject.next(false);
      })
    );
  }

  public getRacesPerSeason(param: SeasonParam): Observable<Race[]> {
    this._isLoadingRacesSubject.next(true);
    return this.httpClient.get<SeasonResponse>(`${this.API_URL}${param.season}${this.RESPONSE_TYPE}?limit=${param.limit}&offset=${param.offset}`).pipe(
      map((season: SeasonResponse) => {
        this._isLoadingRacesSubject.next(false);
        this._racesCountSubject.next(+season.MRData.total);
        return season.MRData.RaceTable.Races;
      }));
  }

  public getRace(year: string, round: string): Observable<Race> {
    return this.httpClient.get<RaceResponse>(`${this.API_URL}${year}/${round}/results${this.RESPONSE_TYPE}`).pipe(
      map((season: RaceResponse) => {
        return season.MRData.RaceTable.Races[0];
      }));
  }

  public getDriversPerSeason(params: SeasonParam): Observable<Driver[]> {
    this._isLoadingDriversSubject.next(true);
    return this.httpClient.get<DriversResponse>(`${this.API_URL}${params.season}/drivers${this.RESPONSE_TYPE}?limit=${params.limit}&offset=${params.offset}`).pipe(
      map((response: DriversResponse) => {
        this._isLoadingDriversSubject.next(false);
        this._driversCountSubject.next(+response.MRData.total);
        return response.MRData.DriverTable.Drivers;
      }),
    );
  }

  public getDriverStandingsPerSeason(params: DriverStandingsParam): Observable<DriverStandings[]> {
    this._isLoadingDriverStandingsSubject.next(true);
    return this.httpClient.get<DriverStandingsResponse>(`${this.API_URL}${params.season}/${params.round}/driverStandings${this.RESPONSE_TYPE}?limit=${params.limit}&offset=${params.offset}`).pipe(
      map((response: DriverStandingsResponse) => {
        this._isLoadingDriverStandingsSubject.next(false);
        this._driverStandingsCountSubject.next(+response.MRData.total);
        return response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      })
    );
  }

  public getFinishingStatusPerRace(season: string, round: string): Observable<Status[]> {
    return this.httpClient.get<FinishingStatusResponse>(`${this.API_URL}${season}/${round}/status${this.RESPONSE_TYPE}`).pipe(
      map((response: FinishingStatusResponse) => {
        return response.MRData.StatusTable.Status;
      })
    );
  }

}
