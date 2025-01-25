import { Component, Input, Output, EventEmitter } from '@angular/core';
import {BookCardComponent} from '../book-card/book-card.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  imports: [
    BookCardComponent,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./book-list.component.sass']
})
export class BookListComponent {
  @Input() books: any[] = [];
  @Input() isLoading: boolean = false;
  @Output() removedFromFavorites = new EventEmitter<any>();

  onRemovedFromFavorites(book: any) {
    this.removedFromFavorites.emit(book);
  }
}
