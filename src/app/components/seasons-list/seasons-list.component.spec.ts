import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1Service } from 'src/app/services/f1.service';

import { SeasonsListComponent } from './seasons-list.component';
import { of } from 'rxjs';

export const MockF1Service: Partial<F1Service> = {
  getSeasons() {
    return of();
  }
}

describe('SeasonsListComponent', () => {
  let component: SeasonsListComponent;
  let fixture: ComponentFixture<SeasonsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
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
});
