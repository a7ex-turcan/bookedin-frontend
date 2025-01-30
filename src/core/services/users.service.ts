import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {User} from '../users/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'api/user/me';

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User | null> {
    return this.http.get<User>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<null> {
    if (error.status === 401) {
      console.error('Unauthorized access - user is not authenticated');
      return throwError(() => new Error('Unauthorized access'));
    }
    console.error('An error occurred while fetching the current user:', error);
    return throwError(() => new Error('An error occurred'));
  }
}
