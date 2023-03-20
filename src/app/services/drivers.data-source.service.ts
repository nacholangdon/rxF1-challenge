import { CollectionViewer, DataSource } from "@angular/cdk/collections";

import { BehaviorSubject, Observable, catchError, combineLatest, finalize, of } from "rxjs";

import { Driver } from "../models/driver";

import { F1Service } from "./f1.service";

export class DriversDataSource implements DataSource<Driver> {

  public driversCount = 0;

  private _driversSubject = new BehaviorSubject<Driver[]>([]);
  public drivers$ = this._driversSubject.asObservable();

  private _loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this._loadingSubject.asObservable();

  constructor(private readonly _service: F1Service) {}

  connect(collectionViewer: CollectionViewer): Observable<Driver[]> {
    return this.drivers$;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this._driversSubject.complete();
    this._loadingSubject.complete();
  }

  loadDrivers(year: string, pageIndex = 0, pageSize = 10) {
    this._loadingSubject.next(true);

    combineLatest([
      this._service.getDriversPerSeason(year, pageIndex, pageSize).pipe(
        catchError(() => of([])),
        finalize(() => this._loadingSubject.next(false))
      ),
      this._service.driversCount$])
    .subscribe(data => {
      this._driversSubject.next(data[0]);
      this.driversCount = data[1]
    });
  }
}
