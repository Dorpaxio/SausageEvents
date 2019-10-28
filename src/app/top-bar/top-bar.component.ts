import { Component, OnInit } from '@angular/core';
import {AuthService, User} from '../auth.service';
import {Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, map} from 'rxjs/operators';
import { Router } from '@angular/router'

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  constructor(private auth: AuthService,
              private router: Router) { }

  user;

  ngOnInit() {
    this.retrieveUser();
  }

  retrieveUser() {
    this.auth.loggedIn().subscribe(res => {
      if(res) {
        this.user = this.auth.getUser().pipe(distinctUntilChanged(),
          map(res => {
            return res.pseudo;
          }),
          catchError(err => {
            return of("");
          })
        );
      }
    });
  }

}
