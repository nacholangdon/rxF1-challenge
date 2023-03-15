import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { SeasonsResponse } from 'src/app/models/seasons-response';

import { F1Service } from 'src/app/services/f1.service';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent {

  public displayedColumns: string[] = ['year'];
  public seasons$: Observable<{ year: string, response: SeasonsResponse}[]> = this._f1Service.getSeasons();

  constructor(private readonly _f1Service: F1Service) { }

}
