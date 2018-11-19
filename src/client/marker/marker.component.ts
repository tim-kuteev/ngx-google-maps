import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ComponentBase } from '../abstract/component-base';
import { MapSubject } from '../map/map.subject';

@Component({
  selector: 'gmaps-marker',
  template: '&#8203;',
})
export class MarkerComponent
    extends ComponentBase<google.maps.Marker, google.maps.MarkerOptions>
    implements OnInit, OnDestroy, OnChanges {

  constructor(
      private map: MapSubject) {
    super();
  }

  ngOnInit(): void {
    this.map.observe().subscribe(map => {
      this.options.map = map;
      this.ngOnChanges();
    });
  }

  ngOnDestroy(): void {
    this.options.map = undefined;
    this.ngOnChanges();
  }

  ngOnChanges(): void {
    if (this.model) {
      this.model.setOptions(this.options);
    } else if (this.options.map) {
      this.model = new google.maps.Marker(this.options);
    }
  }
}
