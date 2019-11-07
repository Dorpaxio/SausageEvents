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

  showMessage = false;

  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {

  }

  subscribeEvent(eventId) {
    this.eventsService.subscribeEvent(eventId).subscribe();
    this.subscribed = true;
    this.showMessage = true;
  }

}
