import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentBase } from '../abstract/component-base';
import { MapSubject } from '../map/map.subject';

@Component({
  selector: 'gmaps-heatmap',
  template: '&#8203;',
})
export class HeatmapComponent
    extends ComponentBase<google.maps.visualization.HeatmapLayer, google.maps.visualization.HeatmapLayerOptions>
    implements OnInit, OnDestroy {

  constructor(
      private map: MapSubject) {
    super();
  }

  ngOnInit(): void {
    if (!google.maps.visualization) {
      return;
    }
    this.map.observe().subscribe(map => {
      this.options.map = map;
      this.model = new google.maps.visualization.HeatmapLayer(this.options);
    });
  }

  ngOnDestroy(): void {
    this.model && this.model.setMap(null);
  }
}
