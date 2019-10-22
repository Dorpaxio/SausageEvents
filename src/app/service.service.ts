import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface User {
  pseudo: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get("http://charlesdesgenetez.fr:3001/users");
  }

  register(user: User) {
    return this.http.post<User>("http://charlesdesgenetez.fr:3001/auth/register", user);
  }

  ping() {
    return this.http.get("http://charlesdesgenetez.fr:3001/");
  }

}
