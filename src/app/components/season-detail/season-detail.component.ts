import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AsyncPipe, DatePipe, JsonPipe, NgIf, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Observable, combineLatest, map, switchMap, tap } from 'rxjs';

import { Race } from 'src/app/models/race';

import { F1Service } from 'src/app/services/f1.service';
import { DriversDataSource } from 'src/app/services/drivers.data-source.service';

@Component({
  selector: 'app-season-detail',
  templateUrl: './season-detail.component.html',
  styleUrls: ['./season-detail.component.scss'],
  standalone: true,
  imports: [NgIf, DatePipe, JsonPipe, AsyncPipe, MatTableModule, MatButtonModule, MatPaginatorModule, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonDetailComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly _service = inject(F1Service);
  private readonly _location = inject(Location);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  public driversDataSource = new DriversDataSource(this._service);
  public displayedDriversColumns: string[] = ['name'];
  public displayedRacesColumns: string[] = ['round', 'raceName', 'date'];

  private _year!: number;
  private _isLoadingSeason$: Observable<boolean> = this._service.isLoadingSeason$;

  private _season$: Observable<any> = this._route.paramMap.pipe(
    switchMap((params: ParamMap) => this._service.getSeason(params.get('year')!))
  );

  public vm$: Observable<any> = combineLatest([
    this._season$,
    this._isLoadingSeason$,
  ]).pipe(
    map(([season, isLoadingSeason]) => ({ races: season, isLoadingSeason }))
  );

  ngOnInit(): void {
    this._year = this._route.snapshot.params['year'];
    this.driversDataSource.loadDrivers(`${this._year}`, 0, 10);
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadDriversPage())).subscribe();
  }

  loadDriversPage() {
    const offset = this.paginator.pageIndex * this.paginator.pageSize;
    this.driversDataSource.loadDrivers(`${this._year}`, offset, this.paginator.pageSize);
  }

  public onRaceClicked(race: Race, year: string): void {
    this._router.navigate(['/race', race.round, year]);
  }

  public goBack(): void {
    this._location.back();
  }

}
