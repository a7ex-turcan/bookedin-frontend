import {Component, OnInit} from '@angular/core';
import {ShelfListComponent} from '../../shared/shelf-list/shelf-list.component';
import {UserStoreService} from '../../core/services/user-store.service';
import {UserBookCollectionService} from '../../core/services/user-book-collection.service';
import {UserBookCollection} from '../../core/books/user-book-collection.model';
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
}
