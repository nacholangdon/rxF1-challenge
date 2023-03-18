import { AsyncPipe, DatePipe, JsonPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { Observable, combineLatest, map, switchMap, tap } from 'rxjs';

import { Driver } from 'src/app/models/driver';

import { F1Service } from 'src/app/services/f1.service';

@Component({
  selector: 'app-season-detail',
  templateUrl: './season-detail.component.html',
  styleUrls: ['./season-detail.component.scss'],
  standalone: true,
  imports: [NgIf, DatePipe, JsonPipe, AsyncPipe, RouterLink, MatTableModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonDetailComponent {

  private readonly _router = inject(Router);
  private readonly _service = inject(F1Service);
  private readonly _route = inject(ActivatedRoute);

  public displayedDriversColumns: string[] = ['name'];
  public displayedRacesColumns: string[] = ['round', 'raceName', 'date'];

  private season$: Observable<any> = this._route.paramMap.pipe(
    switchMap((params: ParamMap) => {
      return this._service.getSeason(params.get('year')!);
    })
  );

  private drivers$: Observable<Driver[]> = this._route.paramMap.pipe(
    switchMap((params: ParamMap) => {
      return this._service.getDriversPerSeason(params.get('year')!).pipe(tap(res => console.log('drivers', res)));
    })
  );

  public vm$: Observable<any> = combineLatest([this.season$, this.drivers$]).pipe(
    map(([season, drivers]) => ({ races: season, drivers })),
    tap(res => console.log('vm$', res))
  );

  goToSeasons() {
    this._router.navigate(['/seasons']);
  }

}
