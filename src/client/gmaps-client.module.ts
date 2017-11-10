import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { MarkerComponent } from './marker/marker.component';
import { HeatmapComponent } from './heatmap/heatmap.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MapComponent,
    MarkerComponent,
    HeatmapComponent,
  ],
  exports: [
    MapComponent,
    MarkerComponent,
    HeatmapComponent,
  ],
})
export class GMapsClientModule {
}
