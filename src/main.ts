import { enableProdMode } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { environment } from './environments/environment';

import { F1Service } from './app/services/f1.service';

import { NavigationComponent } from './app/components/navigation/navigation.component';

const routes: Routes = [
  {
    path: 'seasons',
    loadComponent: () => import('./app/components/seasons-list/seasons-list.component').then(c => c.SeasonsListComponent),
    providers: [
      { provide: F1Service, useClass: F1Service },
    ]
  },
  {
    path: 'season/:year',
    loadComponent: () => import('./app/components/season-detail/season-detail.component').then(c => c.SeasonDetailComponent),
    providers: [
      { provide: F1Service, useClass: F1Service },
    ]
  }
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(NavigationComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
