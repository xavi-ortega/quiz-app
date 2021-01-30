import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private navCntrl: NavController) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('interceptor: no session');

          this.navCntrl.navigateRoot('login');
        }

        return throwError(error);
      })
    );
  }
}
