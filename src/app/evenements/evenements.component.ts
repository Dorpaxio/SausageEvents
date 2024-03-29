import {Component, OnInit, ViewChild} from '@angular/core';
import { EventsService } from '../events.service';
import { map, tap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UsersService} from '../users.service';
import {FloatingMapComponent} from "../map/floating-map/floating-map.component";
import EventMarker from "../map/EventMarker.class";

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
  canDeleteEvent = false;

  @ViewChild(FloatingMapComponent, {static: false}) floatingMap : FloatingMapComponent;

  constructor(public eventsService: EventsService,
              public usersService: UsersService) { }

  ngOnInit() {
    this.eventsService.getSubs().subscribe((data: {id}[]) => {
      data.forEach(d => this.subscriptions.push(d.id));
    });
    this.getEventsPage();
    this.usersService.hasPermission('create_event').subscribe(can => {
      this.canCreateEvent = can;
    });

    this.usersService.hasPermission('delete_event').subscribe(can => {
      this.canDeleteEvent = can;
    });

    this.eventsService.getEvents(0).subscribe(
      (result: {totalPages, events}) => {
        console.log(result);
        for (let i = 0; i <= result.totalPages; i++) {
          this.eventsService.getEvents(i).subscribe(
            (res: {totalPages, events}) => {
              for(let event of res.events) {
                this.floatingMap.map.addMapCursor(new EventMarker(event));
                console.log(event);
              }
            }, error => {

            }
          )
        }
      }, err => {
        console.log(err);
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

  deleteEvent(ev) {
    this.getEventsPage();
  }

}
