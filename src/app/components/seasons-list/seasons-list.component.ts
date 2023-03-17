import { RouterLink } from '@angular/router';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatTableModule } from '@angular/material/table';

import { Observable, map } from 'rxjs';

import { F1Service } from 'src/app/services/f1.service';
import { ApiResponse } from 'src/app/models/api-response';
import { RaceTable } from 'src/app/models/race-table';

@Component({
  standalone: true,
  selector: 'app-seasons-list',
  templateUrl: './seasons-list.component.html',
  styleUrls: ['./seasons-list.component.scss'],
  imports: [ NgIf, JsonPipe, AsyncPipe, RouterLink, MatTableModule ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonsListComponent {

  private readonly _f1Service = inject(F1Service);

  public displayedColumns: string[] = ['year'];
  public seasons$: Observable<string[]> = this._f1Service.storedSeasons$.pipe(
    map((response: ApiResponse<RaceTable>[]) => {
      return response.map((season: ApiResponse<RaceTable>) => {
        return season.MRData['RaceTable'].season;
      });
    })
  );

}
