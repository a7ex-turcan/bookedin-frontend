import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserBookCollection } from '../books/user-book-collection.model';


@Injectable({
  providedIn: 'root'
})
export class UserBookCollectionService {
  private baseUrl = 'api/collections';

  constructor(private http: HttpClient) {}

  createCollection(collection: UserBookCollection): Observable<UserBookCollection> {
    return this.http.post<UserBookCollection>(`${this.baseUrl}`, collection);
  }

  deleteCollection(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  addBookToCollection(id: string, workId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/books`, { workId });
  }

  removeBookFromCollection(id: string, workId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/books/${workId}`);
  }

  getCollection(id: string): Observable<UserBookCollection> {
    return this.http.get<UserBookCollection>(`${this.baseUrl}/${id}`);
  }

  getUserCollections(email: string): Observable<UserBookCollection[]> {
    return this.http.get<UserBookCollection[]>(`${this.baseUrl}/user/${email}`);
  }
}
