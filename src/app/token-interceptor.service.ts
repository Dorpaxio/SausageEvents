import { Injectable, Injector } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {finalize, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  public lastRefresh = 0;

  constructor(public injector: Injector,
              public auth: AuthService,
              public router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`,
      }
    });

    if (Date.now() - this.lastRefresh > 3600000) {
      this.lastRefresh = Date.now();
      this.auth.refreshToken().subscribe( res => {
        localStorage.setItem('token', res.token);
      });
    }

    let statusCode: number;

    return next.handle(tokenizedReq).pipe(
      tap(
        event => {
          statusCode = event instanceof HttpResponse ? event.status : 0;
        }, error => {
          statusCode = error instanceof HttpErrorResponse ? error.status : 0;
          console.log(statusCode);
        }
      ),
      finalize(() => {
        if (statusCode === 498) {
          localStorage.removeItem('token');
          this.router.navigate(['/connexion']).then(() => {});
        }
      })
    );
  }
}
