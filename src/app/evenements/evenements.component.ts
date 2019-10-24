import { Component, OnInit } from '@angular/core';
import {EventsService} from '../events.service';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.scss']
})
export class EvenementsComponent implements OnInit {
  events;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.events = this.eventsService.getEvents();
    this.eventsService.createEvent().subscribe(res => {
      console.log(res);
    });
  }

}
