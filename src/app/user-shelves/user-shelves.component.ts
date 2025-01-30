import { Component, OnInit } from '@angular/core';
import { ShelfListComponent } from '../../shared/shelf-list/shelf-list.component';
import { UserStoreService } from '../../core/services/user-store.service';
import { UserBookCollectionService } from '../../core/services/user-book-collection.service';
import { UserBookCollection } from '../../core/books/user-book-collection.model';

@Component({
  selector: 'app-user-shelves',
  templateUrl: './user-shelves.component.html',
  imports: [
    ShelfListComponent
  ],
  styleUrls: ['./user-shelves.component.sass']
})
export class UserShelvesComponent implements OnInit {
  shelves: { shelfName: string, images: string[] }[] = [];

  constructor(
    private userStoreService: UserStoreService,
    private userBookCollectionService: UserBookCollectionService
  ) {}

  ngOnInit(): void {
    this.userStoreService.user$.subscribe({
      next: user => {
        if (user && user.email) {
          this.userBookCollectionService.getUserCollections(user.email).subscribe({
            next: collections => this.shelves = collections.map(collection => ({
              shelfName: collection.collectionName,
              images: collection.books.map(book => 'api/books/cover/' + book.coverId + '?size=l')
            })),
            error: error => console.error('Error fetching user collections:', error)
          });
        }
      },
      error: error => console.error('Error fetching user:', error)
    });
  }
}
