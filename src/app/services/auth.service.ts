import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../interfaces/auth';
import { mapTo, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const { Storage } = Plugins;

const AUTH_STORAGE_KEY = 'app/auth';

const LOGIN_URL = 'login';
const REGISTER_URL = 'register';
const LOGOUT_URL = 'logout';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token$: BehaviorSubject<string> = new BehaviorSubject('');
  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    Storage.get({
      key: AUTH_STORAGE_KEY,
    }).then(({ value: token }) => {
      if (token) {
        this.setAuth(token);
      }
    });
  }

  check(): boolean {
    return this.isAuthenticated$.getValue();
  }

  login(credentials): Observable<boolean> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/${LOGIN_URL}`, credentials).pipe(
      tap(({ token, user }) => {
        if (token) {
          this.setAuth(token);
        }
      }),
      mapTo(true),
      catchError((err) => {
        console.error('login', err);
        return of(false);
      })
    );
  }

  register(data): Observable<boolean> {
    return this.http.post(`${environment.apiUrl}/${REGISTER_URL}`, data).pipe(
      mapTo(true),
      catchError((err) => {
        console.error('register', err);
        return of(false);
      })
    );
  }

  logout(): Observable<boolean> {
    return this.http.post(`${environment.apiUrl}/${LOGOUT_URL}`, {}).pipe(
      tap(() => {
        this.clearAuth();
      }),
      mapTo(true),
      catchError((err) => {
        console.error('logout', err);
        return of(false);
      })
    );
  }

  private setAuth(token: string) {
    this.token$.next(token);

    Storage.set({
      key: AUTH_STORAGE_KEY,
      value: token,
    });

    this.isAuthenticated$.next(true);
  }

  private clearAuth() {
    this.token$.next('');

    Storage.remove({
      key: AUTH_STORAGE_KEY,
    });

    this.isAuthenticated$.next(false);
  }
}
