import { Component, OnInit } from '@angular/core';
import {LocationService} from "../location.service";

declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(public locationService: LocationService) { }

  latitude: number = 18.5204;
  longitude: number = 73.8567;

  map: any;

  ngOnInit() {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ]
    });

    this.locationService.getPosition().then(
      coords => {
        this.setMapCenter(coords);
      }
    ).catch(() => {
      this.setMapCenter({longitude: 2.39499, latitude: 48.85825})
    });
  }

  setMapCenter({longitude, latitude}) {
    const view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([longitude, latitude]));
    view.setZoom(10);
  }

}
