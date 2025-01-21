import { Component, Input } from '@angular/core';
import { BookDetails } from '../../core/books/book-details.model';
import { AuthorsListPipe } from '../../core/pipes/author-list.pipe';
import { NgIf } from '@angular/common';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  imports: [
    AuthorsListPipe,
    NgIf
  ],
  styleUrls: ['./book-card.component.sass']
})
export class BookCardComponent {
  @Input() book: BookDetails | null = null;

  constructor(private favoritesService: FavoritesService) {}

  toggleFavorite(book: BookDetails | null) {

    if (!book) return;

    if (book.isFavorite) {
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
