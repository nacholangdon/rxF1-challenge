import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { Observable, combineLatest, map, switchMap, tap } from 'rxjs';

import { F1Service } from 'src/app/services/f1.service';

export interface DriverStandings {}

@Component({
  selector: 'app-race-detail',
  standalone: true,
  imports: [AsyncPipe, NgIf, MatButtonModule],
  templateUrl: './race-detail.component.html',
  styleUrls: ['./race-detail.component.scss']
})
export class RaceDetailComponent {

  private readonly _router = inject(Router);
  private readonly _service = inject(F1Service);
  private readonly _route = inject(ActivatedRoute);

  public season: number | undefined;

  private _driverStandings$: Observable<DriverStandings> = this._route.paramMap.pipe(
    switchMap((params: ParamMap) => {
      return this._service.getDriverStandingsPerSeason(params.get('year')!, params.get('round')!);
    })
  );

  private season$: Observable<any> = this._route.paramMap.pipe(
    switchMap((params: ParamMap) => {
      return this._service.getSeason(params.get('year')!);
    })
  );

  public vm$ = combineLatest([this.season$, this._driverStandings$,]).pipe(
    map(([seasons, driverStandings]) => ({ seasons, driverStandings })),
    tap(res => console.log('vm$', res))
  );

  public goToSeason(year: number | undefined): void {
    this._router.navigate(['/season/' + year]);
  }

}
