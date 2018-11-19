import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { GMapsApiLoaderService } from '../../core/services/gmaps-api-loader.service';
import { ComponentBase } from '../abstract/component-base';
import { MapSubject } from './map.subject';

@Component({
  selector: 'gmaps-map',
  template: '<div #mapView class="map"></div><ng-content select="gmaps-marker,gmaps-heatmap"></ng-content>',
  styles: ['.map{height: 100%}'],
  providers: [MapSubject],
})
export class MapComponent extends ComponentBase<google.maps.Map, google.maps.MapOptions> implements AfterContentInit {

  @ViewChild('mapView') mapView;

  constructor(
      private apiLoader: GMapsApiLoaderService,
      private map: MapSubject) {
    super();
  }

  ngAfterContentInit(): void {
    this.apiLoader.ready(() => {
      this.options = Object.assign({center: {lat: 0, lng: 0}, zoom: 3}, this.options);
      this.model = new google.maps.Map(this.mapView.nativeElement, this.options);
      this.map.next(this.model);
    });
  }
}
