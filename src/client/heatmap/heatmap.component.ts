import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentBase } from '../abstract/component-base';
import { GMapsApiLoaderService } from '../../core/services/gmaps-api-loader.service';

@Component({
  selector: 'gmaps-heatmap',
  template: '&#8203;',
})
export class HeatmapComponent
    extends ComponentBase<google.maps.visualization.HeatmapLayer, google.maps.visualization.HeatmapLayerOptions>
    implements OnInit, OnDestroy {

  map: google.maps.Map | null;

  constructor(
      private apiLoader: GMapsApiLoaderService) {
    super();
  }

  ngOnInit(): void {
    if (!google.maps.visualization) {
      return;
    }
    this.apiLoader.ready(() => {
      this.model = new google.maps.visualization.HeatmapLayer(this.options);
    });
  }

  ngOnDestroy(): void {
    this.setMap(null);
  }

  setMap(map: google.maps.Map | null): void {
    this.map = map;
    this.proceedChanges();
  }

  private proceedChanges(): void {
    this.initialized.then(model => {
      if (model.getMap() !== this.map) {
        model.setMap(this.map);
      }
    });
  }
}
