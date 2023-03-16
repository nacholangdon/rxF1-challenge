import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable, map, switchMap } from 'rxjs';

import { RaceTable } from 'src/app/models/race-table';

import { F1Service } from 'src/app/services/f1.service';

@Component({
  selector: 'app-season-detail',
  templateUrl: './season-detail.component.html',
  styleUrls: ['./season-detail.component.scss'],
  standalone: true,
  imports: [NgIf, AsyncPipe, FormsModule]
})
export class SeasonDetailComponent implements OnInit {

  season$!: Observable<RaceTable>;

  private readonly _router = inject(Router);
  private readonly _service = inject(F1Service);
  private readonly _route = inject(ActivatedRoute);

  ngOnInit() {
    this.season$ = this._route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this._service.getSeason(params.get('year')!).pipe(map(season => season.RaceTable))
      )
    );
  }

  gotoSeasons(season: RaceTable) {
    const seasonId = season ? season.season : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this._router.navigate(['/seasons', { id: seasonId, foo: 'foo' }]);
  }

}
