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
    this.eventsService.getSubscriptions()
      .pipe(
        tap(data => console.log(data)),
        map((data: {event_id}) => data.event_id)),
        tap(data => console.log(data))
      .subscribe(
      (data: any[]) => {
        this.subscriptions = data;
      }
    );
    this.events$ = this.eventsService.getEvents();
  }

}
