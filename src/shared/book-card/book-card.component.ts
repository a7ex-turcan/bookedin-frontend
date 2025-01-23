import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../core/books/book.model';
import { NgForOf, NgIf } from '@angular/common';
import { FavoritesService } from '../../core/services/favorites.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  imports: [
    NgIf,
    RouterLink,
    NgForOf
  ],
  styleUrls: ['./book-card.component.sass']
})
export class BookCardComponent {
  @Input() book: Book | null = null;
  @Output() removedFromFavorites = new EventEmitter<Book>();

  imageLoaded = false;

  constructor(private favoritesService: FavoritesService) {}

  toggleFavorite(book: Book | null) {
    if (!book) return;

    if (book.isFavorite) {
      this.removedFromFavorites.emit(this.book!);
      this.favoritesService.removeFavourite(book.workId).subscribe(() => {
        if (book) book.isFavorite = false;
      });
    } else {
      this.favoritesService.addFavourite(book.workId).subscribe(() => {
        if (book) book.isFavorite = true;
      });
    }
  }
}
