import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf, Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BehaviorSubject, Observable, combineLatest, map, switchMap } from 'rxjs';

import { DriverStandings } from 'src/app/models/driver-standings';

import { DriverStandingsParam, F1Service } from 'src/app/services/f1.service';
import { Race } from 'src/app/models/race';

@Component({
  selector: 'app-race-detail',
  standalone: true,
  imports: [AsyncPipe, NgIf, MatTableModule, MatButtonModule, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './race-detail.component.html',
  styleUrls: ['./race-detail.component.scss']
})
export class RaceDetailComponent {

  private readonly _service = inject(F1Service);
  private readonly _location = inject(Location);
  private readonly _route = inject(ActivatedRoute);

  public season: number | undefined;
  public displayedColumns: string[] = ['position', 'number', 'name', 'constructor'];
  public displayedBonusColumns: string[] = ['status', 'count'];

  private _onPageChanged = new BehaviorSubject<PageEvent>({} as PageEvent);
  public onPageChanged$ = this._onPageChanged.asObservable();

  private _driverStandings$: Observable<DriverStandings[]> = combineLatest([this._route.paramMap, this.onPageChanged$]).pipe(
    switchMap((response: [ParamMap, PageEvent]) => {
      const params = response[0];
      const pageEvent: PageEvent = response[1];
      const driverStandingsParam: DriverStandingsParam = {
        season: params.get('year')!,
        round: params.get('round')!,
        offset: pageEvent.pageIndex * pageEvent.pageSize || 0,
        limit: pageEvent.pageSize || 10
      };

      return this._service.getDriverStandingsPerSeason(driverStandingsParam);
    })
  );

  private _race$: Observable<Race> = this._route.paramMap.pipe(
    switchMap((params: ParamMap) =>
      this._service.getRace(params.get('year')!, params.get('round')!)
    )
  );

  private _bonus$: Observable<any> = this._route.paramMap.pipe(
    switchMap((params: ParamMap) =>
      this._service.getFinishingStatusPerRace(params.get('year')!, params.get('round')!)
    )
  );

  public vm$ = combineLatest([this._race$, this._service.isLoadingDriverStandings$, this._driverStandings$, this._service.driverStandingsCount$, this._bonus$]).pipe(
    map(([race, isLoadingDriverStandings, driverStandings, driverStandingsCount, bonus]) => ({ race, isLoadingDriverStandings, driverStandings, driverStandingsCount, bonus })),
  );

  public onDriverStandingsPageChanged(pageEvent: PageEvent): void {
    this._onPageChanged.next(pageEvent);
  }

  public goBack(): void {
    this._location. back();
  }

}
