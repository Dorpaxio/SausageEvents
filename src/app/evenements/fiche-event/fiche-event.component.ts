import {Component, OnInit, Input} from '@angular/core';
import {EventsService} from '../../events.service';
import {
  trigger,
  state,
  style,
  animate,
  transition, stagger, query, keyframes
} from '@angular/animations';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth.service';
import {UsersService} from '../../users.service';

@Component({
  selector: 'app-fiche-event',
  templateUrl: './fiche-event.component.html',
  styleUrls: ['./fiche-event.component.scss'],
  animations: [
    trigger('showSubscriptionMessage', [
      state('false,true', style({
        opacity: 0
      })),
      transition('false => *', [ // each time the binding value changes
        query(':self', [
          animate('0.2s', style({opacity: 1})),
          animate('0.2s 2s', style({opacity: 0}))
        ], {optional: true}),
      ])
    ])
  ]
})
export class FicheEventComponent implements OnInit {
  @Input() event;
  @Input() subscribed: boolean;
  @Input() canDeleteEvent: boolean;

  showMessage = false;
  message = '';
  success = false;

  constructor(public eventsService: EventsService,
              public userService: UsersService) {
  }

  ngOnInit() {

  }

  show(message: string, success: boolean) {
    this.message = message;
    this.showMessage = true;
    this.success = success;
  }

  subscribeEvent(eventId) {
    this.eventsService.subscribeEvent(eventId).subscribe(
      (result: {ok, message}) => {
        if (result.ok) {
          this.subscribed = true;
          this.show('Vous êtes maintenant inscris à cet événement.', true);
        } else {
          this.show('Cet événement a atteint son effectif maximum.', true);
        }
      },
      error => {
        if (error.status === 403) {
          this.show(error.error.message, false);
          this.subscribed = true;
        } else {
          this.show('Une erreur est survenue.', false);
        }
      }
    );
  }

  unsubscribeEvent(eventId) {
    this.eventsService.unsubscribeEvent(eventId).subscribe(
      (result: {ok, message}) => {
        if (result.ok) {
          this.subscribed = false;
          this.show('Votre désinscription a été prise en compte.', true);
        }
      },
      error => {
        this.show(error.error.message || 'Un problème est survenu.', false);
      }
    );
  }

}
