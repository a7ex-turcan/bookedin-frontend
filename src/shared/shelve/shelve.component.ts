import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

export interface ShelfItem {
  name: string;
  isOnShelf: boolean;
}

@Component({
  selector: 'app-shelve',
  templateUrl: './shelve.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./shelve.component.sass']
})
export class ShelveComponent {
  @Input() items: ShelfItem[] = [];
  @Output() bookAdded = new EventEmitter<ShelfItem>();
  @Output() bookRemoved = new EventEmitter<ShelfItem>();
  showFlyout = false;

  onAddBook() {
    this.showFlyout = !this.showFlyout;
  }

  toggleShelf(item: ShelfItem) {
    item.isOnShelf = !item.isOnShelf;
    if (item.isOnShelf) {
      this.bookAdded.emit(item);
    } else {
      this.bookRemoved.emit(item);
    }
  }
}
