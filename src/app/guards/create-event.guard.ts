import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {UsersService} from '../users.service';

@Injectable({
  providedIn: 'root'
})
export class CreateEventGuard implements CanActivate {

  constructor(public userService: UsersService,
              public router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.hasPermission('create_event').pipe(
      map(res => {
        if (res) {
          return true;
        } else {
          this.router.navigate(['/moncompte']).then(() => {});
        }
      })
    );
  }

}
