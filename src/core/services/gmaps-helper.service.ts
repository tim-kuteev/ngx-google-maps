import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GMapsHelperService {

  constructor() {
  }

  geocode(req: google.maps.GeocoderRequest): Observable<google.maps.GeocoderResult[]> {
    return new Observable(observer => {
      new google.maps.Geocoder().geocode(req, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          observer.next(results);
          observer.complete();
        } else {
          observer.error(results);
        }
      });
    });
  }
}
