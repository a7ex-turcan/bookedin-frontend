import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UserBookCollection} from '../books/user-book-collection.model';


export interface CreateUserCollectionRequest {
  collectionName: string;
  workIds: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserBookCollectionService {
  private apiUrl = 'api/collections';

  constructor(private http: HttpClient) {
  }

  createCollection(request: CreateUserCollectionRequest): Observable<UserBookCollection> {
    return this.http.post<UserBookCollection>(this.apiUrl, request).pipe(
      catchError(this.handleError)
    );
  }

  deleteCollection(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addBookToCollection(id: string, workId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/books`, {workId}).pipe(
      catchError(this.handleError)
    );
  }

  removeBookFromCollection(id: string, workId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/books/${workId}`).pipe(
      catchError(this.handleError)
    );
  }

  getCollection(id: string): Observable<UserBookCollection> {
    return this.http.get<UserBookCollection>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getUserCollections(email: string): Observable<UserBookCollection[]> {
    return this.http.get<UserBookCollection[]>(`${this.apiUrl}/user/${email}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('An error occurred; please try again later.'));
  }
}
