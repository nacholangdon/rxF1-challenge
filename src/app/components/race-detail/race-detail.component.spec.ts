import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { RaceDetailComponent } from './race-detail.component';

import { F1Service } from 'src/app/services/f1.service';
import { of } from 'rxjs';

export const MockLocationService: Partial<Location> = {
}

export const MockF1Service: Partial<F1Service> = {
}

describe('RaceDetailComponent', () => {
  let component: RaceDetailComponent;
  let fixture: ComponentFixture<RaceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Location, useValue: MockLocationService },
        { provide: F1Service, useValue: MockF1Service },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ params: { year: '2022', round: '1' }}),
          }
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
});
