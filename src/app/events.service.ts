import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  constructor(public http: HttpClient) {}

  baseUri = BACKEND_URL + 'events/';

  getEvents(page: number) {
    const options = page ? {params: new HttpParams().set('page', page.toString())} : {};
    return this.http.get(this.baseUri, options);
  }

  createEvent(ev: Event) {
    return this.http.post(this.baseUri, {event: ev});
  }

  subscribeEvent(eventId) {
    return this.http.post(this.baseUri + 'subscriptions/', {id: eventId});
  }

  unsubscribeEvent(eventId) {
    return this.http.delete(this.baseUri + 'subscriptions/' + eventId);
  }

  getSubs = () => this.http.get(this.baseUri + 'subscriptions/');

}
