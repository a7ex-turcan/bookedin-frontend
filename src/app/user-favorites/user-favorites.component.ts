import { Component, OnInit } from '@angular/core';
import { Book } from '../../core/books/book.model';
import { FavoritesService } from '../../core/services/favorites.service';
import {BookListComponent} from '../../shared/book-list/book-list.component';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  imports: [
    BookListComponent
  ],
  styleUrls: ['./user-favorites.component.sass']
})
export class UserFavoritesComponent implements OnInit {
  favoriteBooks: Book[] = [];
  isLoading = true;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favoritesService.getUserFavorites().subscribe((books: Book[]) => {
      this.favoriteBooks = books;
      this.isLoading = false;
    });
  }

  onRemovedFromFavorites(book: Book) {
    this.favoriteBooks = this.favoriteBooks.filter(b => b !== book);
    this.favoritesService.removeFavourite(book.workId).subscribe();
  }
}
