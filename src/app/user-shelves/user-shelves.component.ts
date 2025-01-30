import {Component, OnInit} from '@angular/core';
import {ShelfListComponent} from '../../shared/shelf-list/shelf-list.component';
import {UserStoreService} from '../../core/services/user-store.service';
import {UserBookCollectionService} from '../../core/services/user-book-collection.service';
import {Observable, of} from 'rxjs';
import {switchMap, map} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-user-shelves',
  templateUrl: './user-shelves.component.html',
  imports: [
    ShelfListComponent,
    AsyncPipe
  ],
  styleUrls: ['./user-shelves.component.sass']
})
export class UserShelvesComponent implements OnInit {
  shelves$: Observable<{ shelfName: string, images: string[] }[]> = of([]);

  constructor(
    private userStoreService: UserStoreService,
    private userBookCollectionService: UserBookCollectionService
  ) {
  }

  ngOnInit(): void {
    this.shelves$ = this.userStoreService.user$.pipe(
      switchMap(user => {
        if (user && user.email) {
          return this.userBookCollectionService.getUserCollections(user.email).pipe(
            map(collections => collections.map(collection => ({
              shelfName: collection.collectionName,
              images: collection.books.map(book => 'api/books/cover/' + book.coverId + '?size=l')
            })))
          );
        } else {
          return [];
        }
      })
    );
  }


  onShelfCreated(newShelf: { shelfName: string, images: string[] }) {
    this.userStoreService.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.userBookCollectionService.createCollection({
            collectionName: newShelf.shelfName,
            workIds: [],
          });
        } else {
          return of(null);
        }
      })
    ).subscribe({
      next: collection => {
        if (collection) {
          this.shelves$ = this.shelves$.pipe(
            map(shelves => {
              const exists = shelves.some(shelf => shelf.shelfName === collection.collectionName);
              if (!exists) {
                return [...shelves, {
                  shelfName: collection.collectionName,
                  images: []
                }];
              }
              return shelves;
            })
          );
        }
      },
      error: error => console.error('Error creating collection:', error)
    });
  }
}
