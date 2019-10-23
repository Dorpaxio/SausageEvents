import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface User {
  pseudo: string;
  mail: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUri = 'https://charlesdesgenetez.fr:3001/auth/';

  constructor(private http: HttpClient) {}

  register(user) {
    return this.http.post<any>(this.baseUri + 'register', user);
  }

  login(user) {
    return this.http.post<any>(this.baseUri + 'login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    return this.http.get<any>(this.baseUri + 'me');
  }
}
