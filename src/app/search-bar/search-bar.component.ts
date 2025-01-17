// src/app/search-bar/search-bar.component.ts
import { Component, HostListener, ElementRef } from '@angular/core';
import { SearchResult } from '../../shared/search-result/search-result';
import { SearchResultComponent } from '../../shared/search-result/search-result.component';
import { NgForOf, NgIf } from '@angular/common';
import { BookService } from '../../core/services/book.service';
import { Book } from '../../core/books/book.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  imports: [
    SearchResultComponent,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent {
  items: SearchResult[] = [];
  showResults = false;
  private debounceTimeout: any;

  constructor(private eRef: ElementRef, private bookService: BookService) {}

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showResults = false;
    }
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    clearTimeout(this.debounceTimeout);

    this.debounceTimeout = setTimeout(() => {
      this.bookService.search(query).subscribe((books: Book[]) => {
        this.items = books.map(book => ({
          imageUrl: 'book-placeholder.png',
          title: book.title,
          subTitle: book.author
        }));
        this.showResults = this.items.length > 0;
      });
    }, 300); // 300ms debounce time
  }

  clearSearch(input: HTMLInputElement) {
    input.value = '';
    this.showResults = false;
    this.items = [];
  }
}
