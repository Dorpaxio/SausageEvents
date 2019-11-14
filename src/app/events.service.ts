import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BACKEND_URL } from '../assets/config';

interface Event {
  GPS_N;
  GPS_E;
  address;
  city;
  codepostal;
  title;
  description;
  effectifmin;
  effectifmax;
  date;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) {}

  baseUri = BACKEND_URL + 'events/';

  getEvents() {
    return this.http.get(this.baseUri);
  }

  createEvent(ev: Event) {
    return this.http.post(this.baseUri, {event: ev});
  }

  subscribeEvent(eventId) {
    return this.http.post(this.baseUri + 'subscriptions/', {id: eventId});
  }

  getSubs = () => this.http.get(this.baseUri + 'subscriptions/');

}
