import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) {}

  addFavourite(workId: string): Observable<void> {
    return this.http.post<void>('/api/favourites', { workId });
  }
}
