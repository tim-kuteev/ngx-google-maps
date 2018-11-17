import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GMapsCoreConfig } from '../gmaps-core.config';

const API_URL = 'maps.googleapis.com/maps/api/js';

@Injectable()
export class GMapsApiLoaderService {

  private load: Promise<void>;

  constructor(
      @Inject(DOCUMENT) private document: any,
      private config: GMapsCoreConfig) {
    this.init();
  }

  ready(callback?: Function): Promise<void> {
    return this.load.then(() => callback && callback());
  }

  private init() {
    this.load = new Promise<void>((resolve: Function, reject: Function) => {
      if (Array.from(this.document.getElementsByTagName('script'))
              .some((el: HTMLScriptElement) => el.src.includes(API_URL))) {
        return resolve();
      }
      const params = Object.keys(this.config).map(key => `${key}=${this.config[key]}`).join('&');
      const element = Object.assign(this.document.createElement('script'), {
        id: 'google-maps-api-script',
        type: 'text/javascript',
        src: `https://${API_URL}?${params}`,
        onload: resolve,
        onerror: reject,
      });
      this.document.head.appendChild(element);
    });
  }
}
