import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, NavigationExtras, Router, convertToParamMap } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';

import { BehaviorSubject, Observable, of } from 'rxjs';

import { Race } from 'src/app/models/race';
import { Driver } from 'src/app/models/driver';

import { F1Service, SeasonParam } from 'src/app/services/f1.service';

import { SeasonDetailComponent } from './season-detail.component';

export const MockRouter: Partial<Router> = {
  navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
    })
  }
}

export const MockLocationService: Partial<Location> = {
  back(): void { }
}

export const MockF1Service: Partial<F1Service> = {
  getDriversPerSeason(params: SeasonParam): Observable<Driver[]> {
    return of([]);
  },
  getRacesPerSeason(): Observable<Race[]> {
    return of([]);
  },
  isLoadingDrivers$: new BehaviorSubject<boolean>(false),
  driversCount$: new BehaviorSubject<number>(0),
  isLoadingRaces$: new BehaviorSubject<boolean>(false),
  racesCount$: new BehaviorSubject<number>(0)
}

describe('SeasonDetailComponent', () => {
  let component: SeasonDetailComponent;
  let fixture: ComponentFixture<SeasonDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: Router, useValue: MockRouter },
        { provide: F1Service, useValue: MockF1Service },
        { provide: Location, useValue: MockLocationService },
        { provide: ActivatedRoute, useValue: {
            paramMap: of(convertToParamMap({ year: '2022' })),
            snapshot: { params: { year: '2022' }}
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onDriversPageChanged', () => {
    it('should emit some values after changing page', () => {
      // Arrange
      const pageEvent: PageEvent = {
        pageIndex: 1,
        previousPageIndex: 0,
        pageSize: 10,
        length: 10
      };

      // Act
      component.onDriversPageChanged(pageEvent);

      // Assert
      component.onDriversPageChanged$.subscribe(res => {
        expect(res).toBe(pageEvent);
      })
    });
  });

  describe('#onRacesPageChanged', () => {
    it('should emit some values after changing page', () => {
      // Arrange
      const pageEvent: PageEvent = {
        pageIndex: 1,
        previousPageIndex: 0,
        pageSize: 10,
        length: 10
      };

      // Act
      component.onRacesPageChanged(pageEvent);

      // Assert
      component.onRacesPageChanged$.subscribe(res => {
        expect(res).toBe(pageEvent);
      })
    });
  });

  describe('#onRaceClicked', () => {
    it('should navigate to a specific page with params', fakeAsync(() => {
      //Arrange
      const routerSpy = spyOn((component as any)._router, 'navigate').and.callThrough();
      const race = {
        round: '1'
      } as Race;

      // Act
      component.onRaceClicked(race);

      tick();

      // Assert
      expect(routerSpy).toHaveBeenCalledWith(['/race', '1', '2022']);
    }));
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
