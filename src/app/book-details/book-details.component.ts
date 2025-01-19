// src/app/book-details/book-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable, of, tap} from 'rxjs';
import {switchMap, map, catchError, distinctUntilChanged} from 'rxjs/operators';
import { BookDetails } from '../../core/books/book-details.model';
import { BookService } from '../../core/services/book.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  imports: [
    AsyncPipe,
    NgIf
  ],
  styleUrls: ['./book-details.component.sass']
})
export class BookDetailsComponent implements OnInit {
  book$: Observable<BookDetails | null> | null = null;
  authorsList$: Observable<string> | null = null;
  isLoading = true;
  imageLoaded = false; // Add this property

  constructor(private bookService: BookService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.book$ = this.route.paramMap.pipe(
      distinctUntilChanged(),
      tap(_ => this.isLoading = true),
      switchMap(params => {
        const workId = params.get('workId');
        if (workId) {
          return this.bookService.getBookDetails(workId).pipe(
            catchError(() => of(null))
          );
        }
        return of(null);
      }),
      map(bookDetails => {
        this.isLoading = false;
        return bookDetails;
      })
    );

    this.authorsList$ = this.book$.pipe(
      map(bookDetails => (bookDetails?.authors ?? []).map(author => author.name).join(', '))
    );
  }
}
