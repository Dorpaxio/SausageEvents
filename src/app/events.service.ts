import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BACKEND_URL } from '../assets/config';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) {}

  baseUri = BACKEND_URL + 'events/';

  getEvents() {
    return this.http.get(this.baseUri);
  }

  createEvent() {
    return this.http.post(this.baseUri, {yes: 'oui'});
  }
}
