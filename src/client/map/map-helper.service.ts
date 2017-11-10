import { Injectable, QueryList } from '@angular/core';
import {} from '@types/googlemaps';
import { MapComponent } from './map.component';
import { MarkerComponent } from '../marker/marker.component';
import { HeatmapComponent } from '../heatmap/heatmap.component';
import { ComponentBase } from '../abstract/component-base';

@Injectable()
export class MapHelperService {

  private map: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  private heatmapLayers: google.maps.visualization.HeatmapLayer[] = [];

  constructor() {
  }

  initMap(mapComponent: MapComponent) {
    const options = Object.assign({
      center: {lat: 0, lng: 0},
      zoom: 3,
    }, mapComponent.options);
    this.map = new google.maps.Map(mapComponent.mapView.nativeElement, options);
    mapComponent.onModelInit(this.map);
  }

  initMarkers(markerComponents: QueryList<MarkerComponent>) {
    this.initMarkerComponents(markerComponents);
    markerComponents.changes.subscribe(changed => this.initMarkerComponents(changed));
  }

  initHeatmaps(heatmapComponents: QueryList<HeatmapComponent>) {
    if (!google.maps.visualization) {
      return;
    }
    this.initHeatmapComponents(heatmapComponents);
    heatmapComponents.changes.subscribe(changed => this.initHeatmapComponents(changed));
  }

  private initMarkerComponents(markerComponents: QueryList<MarkerComponent>) {
    this.initContentComponents<google.maps.Marker, google.maps.MarkerOptions>(
        markerComponents,
        google.maps.Marker,
        this.markers);
  }

  private initHeatmapComponents(heatmapComponents: QueryList<HeatmapComponent>) {
    this.initContentComponents<google.maps.visualization.HeatmapLayer, google.maps.visualization.HeatmapLayerOptions>(
        heatmapComponents,
        google.maps.visualization.HeatmapLayer,
        this.heatmapLayers);
  }

  private initContentComponents<T extends { setMap }, O>(components: QueryList<ComponentBase<T, O>>, type: { new(O): T }, models: T[]) {
    const filtered = models.filter(model =>
        components.some(component => component.id === model['id']) || model.setMap(null));
    models.splice(0, models.length, ...filtered);
    components
        .filter(component => !models.some(model => model['id'] === component.id))
        .map(component => {
          const options = Object.assign({}, component.options, {map: this.map});
          const model = new type(options);
          model['id'] = component.id;
          component.onModelInit(model);
          return model;
        })
        .forEach(model => {
          models.push(model);
        });
  }
}
