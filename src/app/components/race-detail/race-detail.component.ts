import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf, Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { Observable, combineLatest, map, of, switchMap, tap } from 'rxjs';

import { DriverStandings } from 'src/app/models/driver-standings';

import { F1Service } from 'src/app/services/f1.service';

@Component({
  selector: 'app-race-detail',
  standalone: true,
  imports: [AsyncPipe, NgIf, MatTableModule, MatButtonModule],
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

  private _driverStandings$: Observable<DriverStandings[]> = this._route.paramMap.pipe(
    switchMap((params: ParamMap) =>
      this._service.getDriverStandingsPerSeason(params.get('year')!, params.get('round')!)
    )
  );

  private _race$: Observable<any> = this._route.paramMap.pipe(
    switchMap((params: ParamMap) =>
      this._service.getSeason(params.get('year')!).pipe(map(results => results.find(race => race.round === params.get('round'))))
    )
  );

  private _bonus$: Observable<any> = this._route.paramMap.pipe(
    switchMap((params: ParamMap) =>
      this._service.getFinishingStatusPerRace(params.get('year')!, params.get('round')!)
    )
  );

  public vm$ = combineLatest([this._race$, this._driverStandings$, this._bonus$]).pipe(
    map(([race, driverStandings, bonus]) => ({ race, driverStandings, bonus }))
  );

  public goBack(): void {
    this._location. back();
  }

}
