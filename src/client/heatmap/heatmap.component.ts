import { Component } from '@angular/core';
import {} from '@types/googlemaps'
import { ComponentBase } from '../abstract/component-base';

@Component({
  selector: 'gmaps-heatmap',
  template: '&#8203;',
})
export class HeatmapComponent extends ComponentBase<google.maps.visualization.HeatmapLayer, google.maps.visualization.HeatmapLayerOptions> {
}
