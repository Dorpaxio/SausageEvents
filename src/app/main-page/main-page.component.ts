import { Component, OnInit } from '@angular/core';
import { rowsAnimation } from '../../animations/rowsAnimations.animation';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [rowsAnimation]
})
export class MainPageComponent implements OnInit {
  userList = [];
  constructor(private service : ServiceService) { }

  ngOnInit() {
    this.service.getUsers().subscribe((users : any[]) => {
      this.userList = users;
    });
  }

}
