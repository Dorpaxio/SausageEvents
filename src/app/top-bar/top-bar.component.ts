import { Component, OnInit } from '@angular/core';
import {AuthService, User} from '../auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  user;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUser().pipe(
      map(res => {
        return res.pseudo;
      })
    );
  }

  isLogged() {
    return this.auth.loggedIn();
  }

}
