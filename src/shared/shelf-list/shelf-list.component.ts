import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ShelfCardComponent } from '../shelf-card/shelf-card.component';
import { NgForOf, NgIf } from '@angular/common';
import { AddCollectionCardComponent } from '../add-collection-card/add-collection-card.component';

@Component({
  selector: 'app-shelf-list',
  templateUrl: './shelf-list.component.html',
  imports: [
    ShelfCardComponent,
    NgForOf,
    AddCollectionCardComponent,
    NgIf
  ],
  styleUrls: ['./shelf-list.component.sass'],
  standalone: true
})
export class ShelfListComponent {
  @Input() shelves: { shelfName: string, images: string[] }[] = [];
  @Input() isLoading = true;
  @Output() shelfCreated = new EventEmitter<{ shelfName: string, images: string[] }>();

  onCollectionCreated(newCollection: { shelfName: string, images: string[] }) {
    this.shelves.push(newCollection);
    this.shelfCreated.emit(newCollection);
  }
}
