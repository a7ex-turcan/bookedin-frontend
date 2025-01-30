import { Component, Input } from '@angular/core';
import { NgForOf, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-shelf-card',
  templateUrl: './shelf-card.component.html',
  imports: [
    NgForOf,
    NgStyle,
    NgIf
  ],
  styleUrls: ['./shelf-card.component.sass']
})
export class ShelfCardComponent {
  @Input() title: string = '';
  @Input() images: string[] = [];

  get displayImages(): string[] {
    return this.images.length > 0 ? this.images : ['book-placeholder.png'];
  }

  get hasBooks(): boolean {
    return this.images.length > 0;
  }
}
