import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GMapsCoreConfig } from '../gmaps-core.config';
import { Observable, Subscriber } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

const API_URL = 'maps.googleapis.com/maps/api/js';

@Injectable()
export class GMapsApiLoaderService {

  private _load: Observable<Event | void>;

  constructor(
      @Inject(DOCUMENT) private _document: any,
      private _config: GMapsCoreConfig) {
    this._load = this._loader().pipe(shareReplay(1));
  }

  load(): Observable<Event | void> {
    return this._load;
  }

  private _loader(): Observable<Event | void> {
    return new Observable((subscriber: Subscriber<Event>) => {
      if (Array.from(this._document.getElementsByTagName('script'))
              .some((el: HTMLScriptElement) => el.src.includes(API_URL))) {
        subscriber.next();
        subscriber.complete();
        return;
      }
      const params = Object.keys(this._config).map(key => `${key}=${this._config[key]}`).join('&');
      const element = Object.assign(this._document.createElement('script'), {
        type: 'text/javascript',
        src: `https://${API_URL}?${params}`,
        onload: (res) => {
          subscriber.next(res);
          subscriber.complete();
        },
        onerror: (err) => {
          subscriber.error(err);
        },
      });
      this._document.body.appendChild(element);
    });
  }
}
