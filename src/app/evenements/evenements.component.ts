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
  totalPages = 0;
  page = 0;
  subscriptions = [];
  canCreateEvent: boolean;

  constructor(private eventsService: EventsService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.eventsService.getSubs().subscribe((data: {id}[]) => {
      data.forEach(d => this.subscriptions.push(d.id));
    });
    this.getEventsPage();
    this.usersService.hasPermission('create_event').subscribe(can => {
      this.canCreateEvent = can;
    });
  }

  getEventsPage() {
    this.events$ = this.eventsService.getEvents(this.page).pipe(
      tap((result: {totalPages, events}) => {
        this.totalPages = result.totalPages;
      }),
      map((result: {totalPages, events}) => {
        return result.events;
      })
    );
  }

  arrayPage() {
    return Array(this.totalPages);
  }

  changePage(index: number) {
    this.page = index;
    this.getEventsPage();
  }

}
