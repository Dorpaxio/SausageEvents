import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(public http: HttpClient) { }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({longitude: resp.coords.longitude, latitude: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }

  getLocationInfo(query: string) {
    return this.http.get('https://nominatim.openstreetmap.org/search?q='
      + query.replace(' ', '+')
      + '&format=json&limit=1&addressdetails=1');
  }

}
