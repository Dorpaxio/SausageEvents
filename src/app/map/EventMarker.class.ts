import {EventsService} from "../events.service";

export default class EventMarker {

  constructor(public event) {

  }

  getDescription() {
    return '<h3>' + this.event.title + '</h3><hr/>' +
      '<button class="btn btn-outline-primary">Plus de détails</button>' +
      '<button class="btn btn-primary ml-1">Souscrire</button>';
  }

  isActive() {
    return this.event.isFull === 0;
  }

}
