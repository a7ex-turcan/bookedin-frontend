import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./star-rating.component.sass']
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();
  stars: number[] = [1, 2, 3, 4, 5];
  hoverRating: number = 0;

  updateRating(event: MouseEvent, index: number): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const isHalf = event.clientX - rect.left < rect.width / 2;
    const newRating = index + (isHalf ? 0.5 : 1);
    
    if (event.type === 'mousemove') {
      this.hoverRating = newRating;
    } else if (event.type === 'click') {
      this.rating = newRating;
      this.ratingChange.emit(newRating);
    }
  }

  clearHover(): void {
    this.hoverRating = 0;
  }

  getStarClass(index: number): string {
    const rating = this.hoverRating || this.rating;
    if (rating >= index + 1) return 'fa-star text-gold';
    if (rating > index && rating < index + 1) return 'fa-star-half-alt text-gold';
    return 'fa-star text-gray-400';
  }

  getStarPercentage(index: number): string {
    const rating = this.hoverRating || this.rating;
    if (rating >= index + 1) return '100%';
    if (rating > index) return '50%';
    return '0%';
  }
}
