import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'seasons',
    loadChildren: () => import('./modules/seasons/seasons.module').then(m => m.SeasonsModule)
  },
  {
    path: '',
    redirectTo: '/seasons',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
