// src/core/services/book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../books/book.model';
import {BookDetails} from '../books/book-details.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'api/books';

  constructor(private http: HttpClient) {}

  search(query: string, limit?: number): Observable<Book[]> {
    let params = new HttpParams().set('query', query);
    if (limit) {
      params = params.set('limit', limit.toString());
    }
    return this.http.get<Book[]>(this.apiUrl+'/search', { params });
  }

  getBookDetails(id: string): Observable<BookDetails> {
    return this.http.get<BookDetails>(`${this.apiUrl}/${id}`);
  }
}
