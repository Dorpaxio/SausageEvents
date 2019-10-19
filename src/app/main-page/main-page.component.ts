import { Component, OnInit } from '@angular/core';
import { rowsAnimation } from '../../animations/rowsAnimations.animation';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [rowsAnimation]
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
