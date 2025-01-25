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
    setTimeout(()=> {this.isLoading = false}, 500)
  }

  onRemovedFromFavorites(book: Book) {
    this.searchResult = this.searchResult.filter(b => b !== book);
    this.favoritesService.removeFavourite(book.workId).subscribe();
  }
}
