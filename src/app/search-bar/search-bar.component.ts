// src/app/search-bar/search-bar.component.ts
import {Component, HostListener, ElementRef, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {SearchResult} from '../../shared/search-result/search-result';
import {SearchResultComponent} from '../../shared/search-result/search-result.component';
import {NgForOf, NgIf} from '@angular/common';
import {BookService} from '../../core/services/book.service';
import {Book} from '../../core/books/book.model';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  imports: [
    SearchResultComponent,
    NgForOf,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent implements OnInit, OnChanges {
  items: SearchResult[] = [];
  showResults = false;
  private searchSubject = new Subject<string>();

  public searchQuery?: string;

  constructor(private eRef: ElementRef, private bookService: BookService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300), // wait for 300ms pause in events
      distinctUntilChanged(), // only emit if value is different from previous value
      switchMap(query => this.bookService.search(query)) // switch to new search observable
    ).subscribe(books => {
      this.items = books.map(book => this.mapBookToSearchResult(book));
      this.showResults = this.items.length > 0;
    });
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showResults = false;
    }
  }

  clearSearch(input: HTMLInputElement) {
    input.value = '';
    this.showResults = false;
    this.items = [];
  }

  private mapBookToSearchResult(book: Book): SearchResult {
    return {
      imageUrl: "book-placeholder.png",
      title: book.title,
      subTitle: book.author
    };
  }

  onSearch($event: any) {
    this.searchSubject.next($event);
  }
}
