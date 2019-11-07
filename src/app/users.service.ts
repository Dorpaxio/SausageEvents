import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { BACKEND_URL } from '../assets/config';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUri = BACKEND_URL + 'users/';

  constructor(private http: HttpClient) {}

  hasPermission(perm: string) : Observable<boolean> {
    return this.http.get<boolean>(this.baseUri + 'permissions/' + perm);
  }
}
