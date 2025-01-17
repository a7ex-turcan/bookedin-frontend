// src/app/search-bar/search-bar.component.ts
import { Component, HostListener, ElementRef } from '@angular/core';
import { SearchResult } from '../../shared/search-result/search-result';
import { SearchResultComponent } from '../../shared/search-result/search-result.component';
import { NgForOf, NgIf } from '@angular/common';

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

  constructor(private eRef: ElementRef) {}

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
      this.items = this.getDummyItems(query);
      this.showResults = this.items.length > 0;
    }, 300); // 300ms debounce time
  }

  clearSearch(input: HTMLInputElement) {
    input.value = '';
    this.showResults = false;
    this.items = [];
  }

  private getDummyItems(query: string): SearchResult[] {
    if (!query) {
      return [];
    }
    return [
      { imageUrl: 'book-placeholder.png', title: 'Item 1', subTitle: 'Subtitle 1' },
      { imageUrl: 'book-placeholder.png', title: 'Item 2', subTitle: 'Subtitle 2' },
      { imageUrl: 'book-placeholder.png', title: 'Item 3', subTitle: 'Subtitle 3' },
      { imageUrl: 'book-placeholder.png', title: 'Item 4', subTitle: 'Subtitle 4' },
      { imageUrl: 'book-placeholder.png', title: 'Item 5', subTitle: 'Subtitle 5' }
    ];
  }
}
