import { Component, OnInit } from '@angular/core';
import { ShelfListComponent } from '../../shared/shelf-list/shelf-list.component';
import { UserStoreService } from '../../core/services/user-store.service';
import { UserBookCollectionService } from '../../core/services/user-book-collection.service';
import { Observable, of } from 'rxjs';
import { switchMap, map, finalize, tap } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-shelves',
  templateUrl: './user-shelves.component.html',
  imports: [
    ShelfListComponent,
    AsyncPipe
  ],
  styleUrls: ['./user-shelves.component.sass'],
  standalone: true
})
export class UserShelvesComponent implements OnInit {
  shelves$: Observable<{ shelfName: string, images: string[] }[]> = of([]);
  isLoading = true;

  constructor(
    private userStoreService: UserStoreService,
    private userBookCollectionService: UserBookCollectionService
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.shelves$ = this.userStoreService.user$.pipe(
      switchMap(user => {
        if (user && user.email) {
          return this.userBookCollectionService.getUserCollections(user.email)
            .pipe(

              tap(_=> {this.isLoading = false; console.log(this.isLoading);
              }),
              map(collections => collections.map(collection => ({
                shelfName: collection.collectionName,
                images: collection.books.map(book => 'api/books/cover/' + book.coverId + '?size=l')
              })))
            );
        } else {
          return of([]);
        }
      })
    );
  }


  onShelfCreated(newShelf: { shelfName: string, images: string[] }) {
    this.isLoading = true;  // Add loading state when creating shelf
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
          this.isLoading = false;  // Reset loading state after creation
        }
      },
      error: error => {
        console.error('Error creating collection:', error);
        this.isLoading = false;  // Reset loading state on error
      }
    });
  }
}
