// src/app/search-bar/search-bar.component.ts
import {Component, HostListener, ElementRef, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {SearchResult} from '../../../shared/search-result/search-result';
import {SearchResultComponent} from '../../../shared/search-result/search-result.component';
import {NgForOf, NgIf} from '@angular/common';
import {BookService} from '../../../core/services/book.service';
import {Book} from '../../../core/books/book.model';
import {Subject, tap} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  imports: [
    SearchResultComponent,
    NgForOf,
    NgIf,
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent implements OnInit, OnChanges {
  items: SearchResult[] = [];
  showResults = false;
  loading = false;
  private searchSubject = new Subject<string>();

  public searchQuery?: string;

  constructor(private eRef: ElementRef, private bookService: BookService, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
    this.searchSubject.pipe(
      tap(_ => {
        this.loading = true;
      }),
      debounceTime(300), // wait for 300ms pause in events
      distinctUntilChanged(), // only emit if value is different from previous value
      switchMap(query => {
        if (!query) {
          this.loading = false;
          this.showResults = false;
          return [];
        }
        return this.bookService.search(query, 10);
      }) // switch to new search observable
    ).subscribe(books => {
      this.items = books.map(book => this.mapBookToSearchResult(book));
      this.loading = false;
      this.showResults = this.items.length > 0;
    });
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: Event) {
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
    const distinctAuthors = Array.from(new Set(book.authors));
    return {
      imageUrl: "api/books/cover/" + book.coverId + "?size=s",
      title: book.title,
      subTitle: distinctAuthors.join(', '),
      objectID: book.workId
    };
  }

  onSearch(searchTerm: string) {
    if (!searchTerm) {
      this.showResults = false;
      this.items = [];
      return;
    }
    this.showResults = true;
    this.items = this.generateDummyItems();
    this.searchSubject.next(searchTerm);
  }

  private generateDummyItems(): SearchResult[] {
    return Array(5).fill({
      imageUrl: '',
      title: 'Loading...',
      subTitle: ''
    });
  }

  onResultClick(workId: string) {
    if (this.loading) {
      return; // Prevent clicking if results are loading
    }
    this.showResults = false; // Collapse the flyout
    void this.router.navigate(['/books', workId]);
  }
}
