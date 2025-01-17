import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../books/book.model';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'api/books/search';

  constructor(private http: HttpClient) {
  }

  search(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}?query=${query}`);
  }
}
