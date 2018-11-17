import { AfterContentInit, Component, ContentChildren, QueryList, ViewChild } from '@angular/core';
import { merge, of } from 'rxjs';
import { GMapsApiLoaderService } from '../../core/services/gmaps-api-loader.service';
import { MarkerComponent } from '../marker/marker.component';
import { HeatmapComponent } from '../heatmap/heatmap.component';
import { ComponentBase } from '../abstract/component-base';

@Component({
  selector: 'gmaps-map',
  template: '<div #mapView class="map"></div><ng-content select="gmaps-marker,gmaps-heatmap"></ng-content>',
  styles: ['.map{height: 100%}'],
})
export class MapComponent extends ComponentBase<google.maps.Map, google.maps.MapOptions> implements AfterContentInit {

  @ViewChild('mapView') mapView;
  @ContentChildren(MarkerComponent) private markerComponents: QueryList<MarkerComponent>;
  @ContentChildren(HeatmapComponent) private heatmapComponents: QueryList<HeatmapComponent>;

  constructor(
      private apiLoader: GMapsApiLoaderService) {
    super();
  }

  ngAfterContentInit(): void {
    this.apiLoader.ready(() => {
      this.options = Object.assign({center: {lat: 0, lng: 0}, zoom: 3}, this.options);
      this.model = new google.maps.Map(this.mapView.nativeElement, this.options);

      merge(of(this.markerComponents), this.markerComponents.changes).subscribe(components => {
        components.forEach(component => component.setMap(this.model));
      });
      if (google.maps.visualization) {
        merge(of(this.heatmapComponents), this.heatmapComponents.changes).subscribe(components => {
          components.forEach(component => component.setMap(this.model));
        });
      }
    });
  }
}
