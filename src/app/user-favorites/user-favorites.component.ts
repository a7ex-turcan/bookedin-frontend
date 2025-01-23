import { Component, OnInit } from '@angular/core';
import { Book } from '../../core/books/book.model';
import { BookCardComponent } from '../../shared/book-card/book-card.component';
import { NgForOf } from '@angular/common';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  imports: [
    BookCardComponent,
    NgForOf
  ],
  styleUrls: ['./user-favorites.component.sass']
})
export class UserFavoritesComponent implements OnInit {
  favoriteBooks: Book[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favoritesService.getUserFavorites().subscribe((books: Book[]) => {
      this.favoriteBooks = books;
    });
  }

  onRemovedFromFavorites(book: Book) {
    console.log(book)

    this.favoriteBooks = this.favoriteBooks.filter(b => b.workId !== book.workId);
  }
}
