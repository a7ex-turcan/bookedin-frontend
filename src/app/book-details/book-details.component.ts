import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { switchMap, map, catchError, distinctUntilChanged } from 'rxjs/operators';
import { BookDetails } from '../../core/books/book-details.model';
import { BookService } from '../../core/services/book.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { AuthorsListPipe } from '../../core/pipes/author-list.pipe';
import {ShelveComponent} from '../../shared/shelve/shelve.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  imports: [
    AsyncPipe,
    NgIf,
    AuthorsListPipe,
    NgForOf,
    ShelveComponent
  ],
  styleUrls: ['./book-details.component.sass']
})
export class BookDetailsComponent implements OnInit {
  book$: Observable<BookDetails | null> | null = null;
  authorsList$: Observable<string> | null = null;
  isLoading = true;
  imageLoaded = false;
  isFavorite = false;
  showAllTags = false;
  processedSubjects: string[] = [];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private favoritesService: FavoritesService
  ) { }

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
          this.isFavorite = bookDetails.isFavorite;
          this.processedSubjects = this.getUniqueSplitSubjects(bookDetails.subjects);
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

  toggleShowAllTags() {
    this.showAllTags = !this.showAllTags;
  }

  getUniqueSplitSubjects(subjects: string[]): string[] {
    const uniqueSubjects = new Set<string>();
    subjects.forEach(subject => {
      subject.split(',').forEach(s => uniqueSubjects.add(s.trim()));
    });
    return Array.from(uniqueSubjects);
  }

  getDisplayedSubjects(): string[] {
    return this.showAllTags ? this.processedSubjects : this.processedSubjects.slice(0, 10);
  }

  onBookAdded() {

  }
}
