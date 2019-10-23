import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) {}

  baseUri = "https://charlesdesgenetez.fr:3001/events/";

  getEvents() {
    return this.http.get(this.baseUri);
  }
}
