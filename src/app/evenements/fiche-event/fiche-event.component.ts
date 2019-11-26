import {Component, OnInit, Input} from '@angular/core';
import {EventsService} from "../../events.service";
import {
  trigger,
  state,
  style,
  animate,
  transition, stagger, query, keyframes
} from '@angular/animations';

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

  private showMessage = false;
  private message = '';
  private success = false;

  constructor(private eventsService: EventsService) {
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
        console.log(result);
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

}
