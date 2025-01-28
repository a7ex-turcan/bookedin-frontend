import { Component, Input } from '@angular/core';
import {NgForOf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-shelf-card',
  templateUrl: './shelf-card.component.html',
  imports: [
    NgForOf,
    NgStyle
  ],
  styleUrls: ['./shelf-card.component.sass']
})
export class ShelfCardComponent {
  @Input() shelfName: string = '';
  @Input() mainImageUrl: string = '';
  @Input() additionalImageUrls: string[] = [];

  imageLoaded: boolean = false;
}
