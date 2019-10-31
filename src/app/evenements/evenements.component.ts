import { Component, OnInit } from '@angular/core';
import {EventsService} from '../events.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.scss']
})
export class EvenementsComponent implements OnInit {
  events$;
  subscriptions = [];

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getSubs().subscribe(data => console.log(data)).then(() => {});
    this.events$ = this.eventsService.getEvents();
  }

}
