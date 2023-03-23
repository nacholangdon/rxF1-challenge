import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AsyncPipe, DatePipe, JsonPipe, NgIf, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { BehaviorSubject, Observable, combineLatest, map, switchMap } from 'rxjs';

import { Race } from 'src/app/models/race';
import { Driver } from 'src/app/models/driver';

import { F1Service, SeasonParam } from '../../services/f1.service';

@Component({
  selector: 'app-season-detail',
  templateUrl: './season-detail.component.html',
  styleUrls: ['./season-detail.component.scss'],
  standalone: true,
  imports: [NgIf, DatePipe, JsonPipe, AsyncPipe, MatTableModule, MatButtonModule, MatPaginatorModule, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonDetailComponent implements OnInit {

  private readonly _service = inject(F1Service);
  private readonly _location = inject(Location);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  public year!: number;
  public displayedDriversColumns: string[] = ['name'];
  public displayedRacesColumns: string[] = ['round', 'raceName', 'date'];

  private _onDriversPageChanged = new BehaviorSubject<PageEvent>({} as PageEvent);
  public onDriversPageChanged$ = this._onDriversPageChanged.asObservable();

  private _onRacesPageChanged = new BehaviorSubject<PageEvent>({} as PageEvent);
  public onRacesPageChanged$ = this._onRacesPageChanged.asObservable();

  private _drivers$: Observable<Driver[]> = combineLatest([this._route.paramMap, this.onDriversPageChanged$]).pipe(
    switchMap((response: [ParamMap, PageEvent]) => {
      const params = response[0];
      const pageEvent: PageEvent = response[1];
      const driversParam: SeasonParam = {
        season: params.get('year')!,
        offset: pageEvent.pageIndex * pageEvent.pageSize || 0,
        limit: pageEvent.pageSize || 10
      };

      return this._service.getDriversPerSeason(driversParam);
    })
  );

  private _races$: Observable<Race[]> = combineLatest([this._route.paramMap, this.onRacesPageChanged$]).pipe(
    switchMap((response: [ParamMap, PageEvent]) => {
      const params = response[0];
      const pageEvent: PageEvent = response[1];
      const driversParam: SeasonParam = {
        season: params.get('year')!,
        offset: pageEvent.pageIndex * pageEvent.pageSize || 0,
        limit: pageEvent.pageSize || 10
      };

      return this._service.getRacesPerSeason(driversParam);
    })
  );

  public vm$ = combineLatest([
    this._service.isLoadingDrivers$,
    this._drivers$,
    this._service.driversCount$,
    this._service.isLoadingRaces$,
    this._races$,
    this._service.racesCount$]).pipe(
      map(([isLoadingDrivers, drivers, driversCount, isLoadingRaces, races, racesCount]) =>
        ({ isLoadingDrivers, drivers, driversCount, isLoadingRaces, races, racesCount })
    )
  );

  ngOnInit(): void {
    this.year = this._route.snapshot.params['year'];
  }

  public onDriversPageChanged(pageEvent: PageEvent) {
    this._onDriversPageChanged.next(pageEvent);
  }

  public onRacesPageChanged(pageEvent: PageEvent) {
    this._onRacesPageChanged.next(pageEvent);
  }

  public onRaceClicked(race: Race): void {
    this._router.navigate(['/race', race.round, this.year]);
  }

  public goBack(): void {
    this._location.back();
  }

}
