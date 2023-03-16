import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MatTableModule } from '@angular/material/table';

import { Observable } from 'rxjs';

import { SeasonsResponse } from 'src/app/models/seasons-response';

import { F1Service } from 'src/app/services/f1.service';

@Component({
  standalone: true,
  selector: 'app-seasons-list',
  templateUrl: './seasons-list.component.html',
  styleUrls: ['./seasons-list.component.scss'],
  imports: [ NgIf, AsyncPipe, RouterLink, MatTableModule ]
})
export class SeasonsListComponent {

  private readonly _f1Service = inject(F1Service);

  public displayedColumns: string[] = ['year'];
  public seasons$: Observable<{ year: string, response: SeasonsResponse}[]> = this._f1Service.getSeasons();

}
