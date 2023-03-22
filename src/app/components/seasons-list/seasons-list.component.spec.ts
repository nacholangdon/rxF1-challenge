import { NavigationExtras, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BehaviorSubject, Observable, of } from 'rxjs';

import { F1Service } from 'src/app/services/f1.service';

import { MRData } from 'src/app/models/mr-data';
import { RaceTable } from 'src/app/models/race-table';
import { SeasonsResponse } from 'src/app/models/seasons-response';

import { SeasonsListComponent } from './seasons-list.component';

export const MockF1Service: Partial<F1Service> = {
  getSeasons(): Observable<SeasonsResponse> {
    const seasons: SeasonsResponse = {
      ['2022']: {} as MRData<RaceTable>
    }
    return of(seasons as SeasonsResponse);
  },
  isLoadingSeasons$: new BehaviorSubject<boolean>(false)
}

export const MockRouter: Partial<Router> = {
  navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
    })
  }
}

describe('SeasonsListComponent', () => {
  let component: SeasonsListComponent;
  let fixture: ComponentFixture<SeasonsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: Router, useValue: MockRouter },
        { provide: F1Service, useValue: MockF1Service },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onRowClicked', () => {
    it('should navigate to a specific page with params', fakeAsync(() => {
      //Arrange
      const routerSpy = spyOn((component as any)._router, 'navigate').and.callThrough();
      const year = '2022';

      // Act
      component.onRowClicked(year);

      tick();

      // Assert
      expect(routerSpy).toHaveBeenCalledWith(['/season', '2022']);
    }));
  });
});
