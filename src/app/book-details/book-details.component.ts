// src/app/book-details/book-details.component.ts
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, of, tap} from 'rxjs';
import {switchMap, map, catchError, distinctUntilChanged} from 'rxjs/operators';
import {BookDetails} from '../../core/books/book-details.model';
import {BookService} from '../../core/services/book.service';
import {FavoritesService} from '../../core/services/favorites.service';
import {AsyncPipe, NgIf} from '@angular/common';
import {AuthorsListPipe} from '../../core/pipes/author-list.pipe';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  imports: [
    AsyncPipe,
    NgIf,
    AuthorsListPipe
  ],
  styleUrls: ['./book-details.component.sass']
})
export class BookDetailsComponent implements OnInit {
  book$: Observable<BookDetails | null> | null = null;
  authorsList$: Observable<string> | null = null;
  isLoading = true;
  imageLoaded = false;
  isFavorite = false; // Add this property

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private favoritesService: FavoritesService // Inject FavoritesService
  ) {
  }

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
        if (bookDetails) {
          this.isFavorite = bookDetails.isFavorite; // Set isFavorite based on bookDetails
        }
        return bookDetails;
      })
    );

    this.authorsList$ = this.book$.pipe(
      map(bookDetails => (bookDetails?.authors ?? []).map(author => author.name).join(', '))
    );
  }

  toggleFavorite(bookDetails: BookDetails) {
    if (this.isFavorite) {
      this.isFavorite = false;

      this.favoritesService.removeFavourite(bookDetails.workId).subscribe(() => {
        this.isFavorite = false;
      });
    } else {
      this.isFavorite = true;
      this.favoritesService.addFavourite(bookDetails.workId).subscribe(() => {
        this.isFavorite = true;
      });
    }
  }
}
