import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventsService} from '../../events.service';
import {catchError, finalize, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {FloatingMapComponent} from "../../map/floating-map/floating-map.component";
import {LocationService} from "../../location.service";
import Marker from "../../map/Marker.class";

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.scss']
})
export class EventCreationComponent implements OnInit {

  eventForm: FormGroup;
  minutes: string[];

  @ViewChild(FloatingMapComponent, {static: false}) floatingMap: FloatingMapComponent;

  constructor(public fb: FormBuilder,
              public eventsService: EventsService,
              public router: Router,
              public locationService: LocationService) {
    this.minutes = Array(60).fill(0).map((x, i) => ('0' + i).slice(-2));
  }

  ngOnInit() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      codepostal: ['', Validators.required],
      effectifmin: ['0'],
      effectifmax: ['50000'],
      date: ['', Validators.required],
      heures: ['', Validators.required],
      minutes: ['', Validators.required],
    });
  }

  onSubmit() {
    const values = this.eventForm.value;

    const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    const dt = new Date(values.date.replace(pattern, '$3-$2-$1') + ' ' + values.heures + ':' + values.minutes + ':00');


    const event = {
      GPS_N: 0,
      GPS_E: 0,
      title: values.title,
      description: values.description,
      address: values.address,
      city: values.city,
      codepostal: values.codepostal,
      effectifmin: values.effectifmin,
      effectifmax: values.effectifmax,
      date: dt.toISOString().replace('Z', ' ').replace('T', ' ').split('.')[0],
    }

    this.locationService.getLocationInfo(values.address + ', ' + values.codepostal + ' ' + values.city).pipe(
      tap(
        (result: [{ lon, lat }]) => {
          if(result.length >= 1) {
            event.GPS_N = result[0].lat;
            event.GPS_E = result[0].lon;
          }
          console.log(result);
        }
      ), finalize(() => {
        this.eventsService.createEvent(event).subscribe(
          (data: { ok, message }) => {
            if (data.ok) {
              this.router.navigate(['/evenements']).then(r => {
              });
            }
          },
          error => {
            console.log('erreur');
          }
        );
      })
    ).subscribe();
  }

}
