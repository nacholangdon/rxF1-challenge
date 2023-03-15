import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { SeasonsRoutingModule } from './seasons-routing.module';
import { SeasonsComponent } from './seasons.component';


@NgModule({
  declarations: [
    SeasonsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    SeasonsRoutingModule
  ]
})
export class SeasonsModule { }
