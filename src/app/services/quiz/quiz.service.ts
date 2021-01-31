import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Quiz, QuizResults } from 'src/app/interfaces/quiz';
import { HttpCommonService } from 'src/app/utils/http-common.service';
import { environment } from 'src/environments/environment';

const GET_ALL_URL = '';
const GET_BY_ID_URL = '';
const SEND_RESULTS_URL = '';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient, private httpCommon: HttpCommonService) {}

  getAll(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${environment.apiUrl}/${GET_ALL_URL}`).pipe(
      catchError((err) => {
        console.error('quiz -> getAll', err);
        return of([]);
      })
    );
  }

  get(id: string): Observable<Quiz> {
    return this.http
      .get<Quiz>(`${environment.apiUrl}/${GET_BY_ID_URL}`, {
        headers: this.httpCommon.getHeaders(),
        params: {
          id,
        },
      })
      .pipe(
        catchError((err) => {
          console.error('quiz -> get', err);
          return of(undefined);
        })
      );
  }

  sendResults(id: number, results: QuizResults): Observable<boolean> {
    return this.http
      .post<boolean>(
        `${environment.apiUrl}/${SEND_RESULTS_URL}`,
        {
          id,
          results,
        },
        {
          headers: this.httpCommon.getHeaders(),
        }
      )
      .pipe(
        catchError((err) => {
          console.error('quiz -> sendResults', err);
          return of(false);
        })
      );
  }
}
