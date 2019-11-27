import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of, Subscription, throwError} from 'rxjs';
import { BACKEND_URL } from '../assets/config';

export interface User {
  pseudo: string;
  mail: string;
  address;
  city;
  postal;
  img;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUri = BACKEND_URL + 'auth/';

  user: User;

  constructor(public http: HttpClient,
              public router: Router) {}

  register(user) {
    return this.http.post<any>(this.baseUri + 'register', user);
  }

  login(user) {
    return this.http.post<any>(this.baseUri + 'login', user);
  }

  refreshToken() {
    return this.http.patch<any>(this.baseUri + 'token', {refresh: true});
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

  handleMeError(error: HttpErrorResponse) {
    console.log('yes');
    if (error.status === 401) {
      localStorage.removeItem('token');
      return throwError('Le token n\'est pas valide.');
    }

    return throwError('Une erreur est survenue.');
  }

  getUser() {
    return this.http.get<any>(this.baseUri + 'me').pipe(
      tap((res) => {
        this.user = res;
      }),
      catchError(this.handleMeError)
    );
  }

  getLastSavedUser() {
    return this.user;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/connexion']);
  }

  deleteAccount(): Observable<boolean> {
    return this.http.delete(this.baseUri + 'me').pipe(
      map((res: {ok, message}) => {
        if (res.ok) { localStorage.removeItem('token'); }
        return res.ok;
      })
    );
  }

}
