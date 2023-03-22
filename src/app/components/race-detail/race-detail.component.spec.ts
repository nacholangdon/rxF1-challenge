import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BehaviorSubject, Observable, of } from 'rxjs';

import { Race } from 'src/app/models/race';
import { Status } from 'src/app/models/status';
import { DriverStandings } from 'src/app/models/driver-standings';

import { DriverStandingsParam, F1Service } from 'src/app/services/f1.service';

import { RaceDetailComponent } from './race-detail.component';
import { PageEvent } from '@angular/material/paginator';

export const MockLocationService: Partial<Location> = {
  back(): void { }
}

export const MockF1Service: Partial<F1Service> = {
  getRace(year: string, round: string): Observable<Race> {
    return of({} as Race);
  },
  getDriverStandingsPerSeason(params: DriverStandingsParam): Observable<DriverStandings[]> {
    return of([]);
  },
  getFinishingStatusPerRace(season: string, round: string): Observable<Status[]> {
    return of([]);
  },
  isLoadingDriverStandings$: new BehaviorSubject<boolean>(false),
  driverStandingsCount$: new BehaviorSubject<number>(0)
}

describe('RaceDetailComponent', () => {
  let component: RaceDetailComponent;
  let fixture: ComponentFixture<RaceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: F1Service, useValue: MockF1Service },
        { provide: Location, useValue: MockLocationService },
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ year: '2022', round: '1' })) }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onDriverStandingsPageChanged', () => {
    it('should emit some values after changing page', () => {
      // Arrange
      const pageEvent: PageEvent = {
        pageIndex: 1,
        previousPageIndex: 0,
        pageSize: 10,
        length: 10
      };

      // Act
      component.onDriverStandingsPageChanged(pageEvent);

      // Assert
      component.onPageChanged$.subscribe(res => {
        expect(res).toBe(pageEvent);
      })
    });
  });

  describe('#goBack', () => {
    it('should call Location.back', () => {
      //Arrange
      const spyLocation = spyOn((component as any)._location, 'back');

      // Act
      component.goBack();

      // Assert
      expect(spyLocation).toHaveBeenCalled();
    });
  });
});
