import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin, map } from 'rxjs';

import { MRData } from '../models/mr-data';
import { SeasonsResponse } from '../models/seasons-response';

@Injectable({
  providedIn: 'root'
})
export class F1Service {

  private API_URL = 'http://ergast.com/api/f1/';
  private SEASONS = [2018,2019,2020,2021,2022];
  private RESPONSE_TYPE = '.json';

  constructor(private httpClient: HttpClient) { }

  getSeasons(): Observable<any> {
    const requests = {};
    this.SEASONS.forEach((season: number) => {
      Object.assign(requests, {[season]: this.httpClient.get<any>(`${this.API_URL}${season}${this.RESPONSE_TYPE}`)});
    })
    return forkJoin(requests).pipe(
      map((response: SeasonsResponse) => {
        const array: { year: string, response: MRData }[] = [];

        for (const [key, value] of Object.entries(response)) {
          array.push({ year: key, response: value.MRData});
        }

        return array;
      })
    );
  }

  getSeason(year: string): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}season${year}${this.RESPONSE_TYPE}`);
  }

}
