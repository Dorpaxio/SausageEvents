import { Component, OnInit } from '@angular/core';
import {EventsService} from '../events.service';
import { map } from 'rxjs/operators';

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
      .pipe(map(data => data.event_id))
      .subscribe(
      (data: any[]) => {
        this.subscriptions = data;
      }
    );
    this.events$ = this.eventsService.getEvents();
  }

}
