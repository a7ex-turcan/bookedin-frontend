import { Component, OnInit } from '@angular/core';
    import { ActivatedRoute } from '@angular/router';
    import { combineLatest, Observable, of } from 'rxjs';
    import { switchMap, map, catchError, distinctUntilChanged, shareReplay, tap } from 'rxjs/operators';
    import { BookDetails } from '../../core/books/book-details.model';
    import { BookService } from '../../core/services/book.service';
    import { UserBookCollectionService } from '../../core/services/user-book-collection.service';
    import { UserStoreService } from '../../core/services/user-store.service';
    import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
    import { AuthorsListPipe } from '../../core/pipes/author-list.pipe';
    import { ShelveComponent, ShelfItem } from '../../shared/shelve/shelve.component';
import {FavoritesService} from '../../core/services/favorites.service';
import {StarRatingComponent} from '../../shared/star-rating/star-rating.component';

    @Component({
      selector: 'app-book-details',
      templateUrl: './book-details.component.html',
      imports: [
        AsyncPipe,
        NgIf,
        AuthorsListPipe,
        NgForOf,
        ShelveComponent,
        StarRatingComponent
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
      shelves$: Observable<ShelfItem[]> | null = null;

      constructor(
        private bookService: BookService,
        private route: ActivatedRoute,
        private userBookCollectionService: UserBookCollectionService,
        private userStoreService: UserStoreService,
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
          }),
          shareReplay(1)
        );

        this.authorsList$ = this.book$.pipe(
          map(bookDetails => (bookDetails?.authors ?? []).map(author => author.name).join(', '))
        );

        this.shelves$ = combineLatest([
          this.userStoreService.user$,
          this.book$
        ]).pipe(
          map(([user, book]) => {
            if (user && book) {
              return user.collections.map(shelf => ({
                name: shelf.collectionName,
                isOnShelf: shelf.workIds.includes(book.workId),
                id: shelf.id
              }));
            }
            return [];
          }),
          catchError(() => of([]))
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

      onBookAdded(shelf: ShelfItem, workId: string) {
        this.userBookCollectionService.addBookToCollection(shelf.id, workId).subscribe(() => {
          console.log(`Book with workId ${workId} added to shelf ${shelf.name}`);
        });
      }

      onBookRemoved(shelf: ShelfItem, workId: string) {
        this.userBookCollectionService.removeBookFromCollection(shelf.id, workId).subscribe(() => {
          console.log(`Book with workId ${workId} removed from shelf ${shelf.name}`);
        });
      }
    }
