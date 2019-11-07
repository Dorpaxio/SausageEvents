import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import { BACKEND_URL } from '../assets/config';

export interface User {
  pseudo: string;
  mail: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUri = BACKEND_URL + 'auth/';

  constructor(private http: HttpClient,
              private router: Router) {}

  register(user) {
    return this.http.post<any>(this.baseUri + 'register', user);
  }

  login(user) {
    return this.http.post<any>(this.baseUri + 'login', user);
  }

  loggedIn() {
    if (!localStorage.getItem('token')) {
      return of(false);
    } else {
      return this.http.get(this.baseUri + 'me').pipe(
        map(res => {
          return !!res;
        }),
        catchError(err => {
          return of(false);
        })
      );
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    return this.http.get<any>(this.baseUri + 'me');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/connexion']);
  }

}
