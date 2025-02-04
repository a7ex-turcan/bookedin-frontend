import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  imports: [
    NgForOf,
    NgClass
  ],
  styleUrls: ['./star-rating.component.sass']
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();
  stars: number[] = [1, 2, 3, 4, 5];
  hoverIndex: number = -1;

  setHover(index: number): void {
    this.hoverIndex = index;
  }

  clearHover(): void {
    this.hoverIndex = -1;
  }
}
