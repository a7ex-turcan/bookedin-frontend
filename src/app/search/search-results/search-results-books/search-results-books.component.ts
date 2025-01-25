import {Component, OnInit} from '@angular/core';
import {BookCardComponent} from "../../../../shared/book-card/book-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {Book} from '../../../../core/books/book.model';
import {FavoritesService} from '../../../../core/services/favorites.service';

@Component({
  selector: 'app-search-results-books',
  imports: [
    BookCardComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './search-results-books.component.html',
  styleUrl: './search-results-books.component.sass'
})
export class SearchResultsBooksComponent implements OnInit{
  searchResult: Book[] = [];
  isLoading = true;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    // Adding dummy books
    this.searchResult = [
      { workId: '1', title: 'Dummy Book 1', authors: ['Author 1'], coverId: 1, isFavorite: false },
      { workId: '2', title: 'Dummy Book 2', authors: ['Author 2'], coverId: 2, isFavorite: false },
      { workId: '3', title: 'Dummy Book 3', authors: ['Author 3'], coverId: 3, isFavorite: false }
    ];
    setTimeout(() => { this.isLoading = false }, 500);
  }

  onRemovedFromFavorites(book: Book) {
    this.searchResult = this.searchResult.filter(b => b !== book);
    this.favoritesService.removeFavourite(book.workId).subscribe();
  }
}
