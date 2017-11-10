import { Component } from '@angular/core';
import {} from '@types/googlemaps'
import { ComponentBase } from '../abstract/component-base';

@Component({
  selector: 'gmaps-marker',
  template: '&#8203;',
})
export class MarkerComponent extends ComponentBase<google.maps.Marker, google.maps.MarkerOptions> {
}
