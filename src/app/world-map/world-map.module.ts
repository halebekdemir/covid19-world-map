import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorldMapRoutingModule } from './world-map-routing.module';
import { WorldMapComponent } from './world-map.component';
import { LoadingModule } from 'src/shared/components/loading/loading.module';


@NgModule({
  declarations: [
    WorldMapComponent
  ],
  imports: [
    CommonModule,
    WorldMapRoutingModule,
    LoadingModule
  ]
})
export class WorldMapModule { }
