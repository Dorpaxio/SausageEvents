import { Component, OnInit } from '@angular/core';
import {LocationService} from "../location.service";
import * as L from 'leaflet';
import {EventsService} from "../events.service";
import {catchError, tap} from "rxjs/operators";
import EventMarker from "./EventMarker.class";
import Marker from "./Marker.class";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(public locationService: LocationService,
              public eventsService: EventsService) { }

  map: any;

  ngOnInit() {
    this.map = L.map('frugalmap').setView([48.85825, 2.39499], 12);

    this.locationService.getPosition().then(
      (coords: {latitude, longitude}) => {
        this.setMapCenter(coords);
      }
    ).catch(() => {
      this.setMapCenter({latitude: 48.85825, longitude: 2.39499});
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(this.map);

  }

  setMapCenter({latitude, longitude}) {
    this.map.setView([latitude, longitude], 12);
  }

  addMapCursor(marker: Marker) {
    const markerIcon = L.icon({
      iconUrl: marker.isActive() ? 'assets/img/map-cursor-active.png' : 'assets/map-cursor-inactive.png'
    });
    L.marker([marker.obj.latitude, marker.obj.longitude], {icon: markerIcon}).bindPopup(marker.getDescription()).addTo(this.map);
  }

}
