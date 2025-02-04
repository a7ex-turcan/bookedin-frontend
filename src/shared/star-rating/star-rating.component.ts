import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./star-rating.component.sass']
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  stars: boolean[] = Array(5).fill(false);

  ngOnInit() {
    this.updateStars();
  }

  updateStars() {
    this.stars = this.stars.map((_, i) => i < this.rating);
  }

  setRating(index: number) {
    this.rating = index + 1;
    this.ratingChange.emit(this.rating);
    this.updateStars();
  }
}
