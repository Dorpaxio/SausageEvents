import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { map, tap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.scss']
})
export class EvenementsComponent implements OnInit {
  events$;
  subscriptions = [];
  canCreateEvent$: Observable<boolean>;

  constructor(private eventsService: EventsService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.eventsService.getSubs().subscribe((data: {event_id}[]) => {
      data.forEach(d => this.subscriptions.push(d.event_id));
    });
    this.events$ = this.eventsService.getEvents();
    this.canCreateEvent$ = this.usersService.hasPermission('create_event');
  }

}
