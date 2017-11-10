import { Component, ContentChildren, QueryList, ViewChild } from '@angular/core';
import {} from '@types/googlemaps';
import { MapHelperService } from './map-helper.service';
import { GMapsApiLoaderService } from '../../core/services/gmaps-api-loader.service';
import { ApiReady } from '../abstract/api-ready';
import { MarkerComponent } from '../marker/marker.component';
import { HeatmapComponent } from '../heatmap/heatmap.component';

@Component({
  selector: 'gmaps-map',
  template: '<div #mapView class="map"></div><ng-content select="gmaps-marker,gmaps-heatmap"></ng-content>',
  styles: ['.map{height: 100%}'],
  viewProviders: [MapHelperService],
})
export class MapComponent extends ApiReady<google.maps.Map, google.maps.MapOptions> {

  @ViewChild('mapView') mapView;
  @ContentChildren(MarkerComponent) private markerComponents: QueryList<MarkerComponent>;
  @ContentChildren(HeatmapComponent) private heatmapComponents: QueryList<HeatmapComponent>;

  constructor(
      private helper: MapHelperService,
      loader: GMapsApiLoaderService) {
    super(loader);
  }

  protected ready(): void {
    this.helper.initMap(this);
    this.helper.initMarkers(this.markerComponents);
    this.helper.initHeatmaps(this.heatmapComponents);
  }
}
