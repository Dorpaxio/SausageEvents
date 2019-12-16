import {EventsService} from "../events.service";
import Marker from "./Marker.class";
import {DatePipe} from "@angular/common";

export default class EventMarker extends Marker {

  constructor(public event) {
    super({
      latitude: event.GPS_N,
      longitude: event.GPS_E,
      description: event.title});
  }



  getDescription() {
    const date = new DatePipe('fr').transform(this.event.date);
    return '<h3>' + this.event.title + '</h3><hr/>' +
      '<p class="text-primary">'+this.event.description.slice(0, 100)+'...</p>' +
      '<p class="text-danger">'+date+'</p>';
  }

  isActive() {
    return this.event.isFull === 0;
  }

}
