import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationService} from "../../location.service";
import {MapComponent} from "../map.component";

@Component({
  selector: 'app-floating-map',
  templateUrl: './floating-map.component.html',
  styleUrls: ['./floating-map.component.scss']
})
export class FloatingMapComponent implements OnInit {

  searchQuery: string;
  hidden: boolean = true;

  @ViewChild(MapComponent, {static: false}) map: MapComponent;

  constructor(public locationService: LocationService) { }

  ngOnInit() {
  }

  search() {
    this.locationService.getLocationInfo(this.searchQuery).subscribe(
      (res: {lon, lat}) => {
        const coords = {
          longitude: parseFloat(res[0].lon),
          latitude: parseFloat(res[0].lat)
        };
        console.log(coords);<
        this.map.setMapCenter(coords);
      }, err => {
        alert(err);
      }
    )
  }

  show() {
    this.hidden = false;
  }

  hide() {
    this.hidden = true;
  }

}
