import { Router, RouterModule } from '@angular/router';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Observable, combineLatest, map, startWith } from 'rxjs';

import { SeasonsResponse } from 'src/app/models/seasons-response';

import { F1Service } from '../../services/f1.service';

@Component({
  standalone: true,
  selector: 'app-seasons-list',
  templateUrl: './seasons-list.component.html',
  styleUrls: ['./seasons-list.component.scss'],
  imports: [ NgIf, JsonPipe, AsyncPipe, RouterModule, MatTableModule, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonsListComponent {

  private readonly _router = inject(Router);
  private readonly _service = inject(F1Service);

  public displayedColumns: string[] = ['year'];
  public seasons$: Observable<string[]> = this._service.getSeasons().pipe(
    map((response: SeasonsResponse) => Object.keys(response)),
    startWith([]),
  );

  public vm$ = combineLatest([
    this._service.isLoadingSeasons$,
    this.seasons$,
    ]).pipe(
    map(([isLoadingSeasons, seasons]) => ({ isLoadingSeasons, seasons }))
  );

  public onRowClicked(year: string): void {
    this._router.navigate(['/season', year]);
  }

}
