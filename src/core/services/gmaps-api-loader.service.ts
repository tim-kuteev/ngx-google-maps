import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GMapsCoreConfig } from '../gmaps-core.config';

@Injectable()
export class GMapsApiLoaderService {

  private _load: Promise<void>;

  constructor(
      @Inject(DOCUMENT) private document: any,
      private config: GMapsCoreConfig) {
    this.init();
  }

  get load() {
    return this._load;
  }

  private init() {
    this._load = new Promise<void>((resolve: Function, reject: Function) => {
      const params = Object.keys(this.config).map(key => `${key}=${this.config[key]}`).join('&');
      const element = Object.assign(this.document.createElement('script'), {
        id: 'google-maps-api-script',
        type: 'text/javascript',
        src: `https://maps.googleapis.com/maps/api/js?${params}`,
        onload: () => resolve(),
        onerror: err => reject(err),
      });
      this.document.body.appendChild(element);
    });
  }
}
