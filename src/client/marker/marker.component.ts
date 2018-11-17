import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ComponentBase } from '../abstract/component-base';
import { GMapsApiLoaderService } from '../../core/services/gmaps-api-loader.service';

@Component({
  selector: 'gmaps-marker',
  template: '&#8203;',
})
export class MarkerComponent
    extends ComponentBase<google.maps.Marker, google.maps.MarkerOptions>
    implements OnInit, OnDestroy, OnChanges {

  map: google.maps.Map | null;

  constructor(
      private apiLoader: GMapsApiLoaderService) {
    super();
  }

  ngOnInit(): void {
    this.apiLoader.ready(() => {
      this.model = new google.maps.Marker(this.options);
    });
  }

  ngOnDestroy(): void {
    this.setMap(null);
  }

  ngOnChanges(): void {
    this.proceedChanges();
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
      model.setOptions(this.options);
    });
  }
}
