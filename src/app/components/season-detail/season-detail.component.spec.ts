import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { F1Service } from 'src/app/services/f1.service';

import { SeasonDetailComponent } from './season-detail.component';

export const MockF1Service: Partial<F1Service> = {
}

describe('SeasonDetailComponent', () => {
  let component: SeasonDetailComponent;
  let fixture: ComponentFixture<SeasonDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: F1Service, useValue: MockF1Service },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ params: { year: '2022', round: '1' }}),
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
});
