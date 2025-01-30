import { Component, Input } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

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
  showFlyout = false;

  onAddBook() {
    this.showFlyout = !this.showFlyout;
  }
}
