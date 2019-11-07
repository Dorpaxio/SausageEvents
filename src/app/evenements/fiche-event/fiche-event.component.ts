import { Component, OnInit, Input } from '@angular/core';
import {EventsService} from "../../events.service";

@Component({
  selector: 'app-fiche-event',
  templateUrl: './fiche-event.component.html',
  styleUrls: ['./fiche-event.component.scss']
})
export class FicheEventComponent implements OnInit {
  @Input() event;
  @Input() subscribed: boolean;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {

  }

  subscribeEvent(eventId) {
    this.eventsService.subscribeEvent(eventId).subscribe();
  }

}
