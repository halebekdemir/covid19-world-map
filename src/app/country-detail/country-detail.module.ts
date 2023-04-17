import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryDetailRoutingModule } from './country-detail-routing.module';
import { CountryDetailComponent } from './country-detail.component';
import { LoadingModule } from 'src/shared/loading/loading.module';


@NgModule({
  declarations: [
    CountryDetailComponent
  ],
  imports: [
    CommonModule,
    CountryDetailRoutingModule,
    LoadingModule
  ]
})
export class CountryDetailModule { }
