import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { distinctUntilChanged, filter } from 'rxjs/internal/operators';

@Injectable()
export class MapSubject extends BehaviorSubject<google.maps.Map | null> {

  constructor() {
    super(null);
  }

  observe(): Observable<google.maps.Map> {
    return this.pipe(
        filter(val => val !== null),
        distinctUntilChanged());
  }
}
