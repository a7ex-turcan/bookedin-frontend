import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent {
  items: string[] = [];
  showResults = false;
  private debounceTimeout: any;

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    clearTimeout(this.debounceTimeout);

    this.debounceTimeout = setTimeout(() => {
      this.items = this.getDummyItems(query);
      this.showResults = this.items.length > 0;
    }, 300); // 300ms debounce time
  }

  private getDummyItems(query: string): string[] {
    if (!query) {
      return [];
    }
    return ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  }
}
