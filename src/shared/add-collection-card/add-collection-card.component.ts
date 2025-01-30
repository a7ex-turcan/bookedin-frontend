import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-collection-card',
  templateUrl: './add-collection-card.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./add-collection-card.component.sass']
})
export class AddCollectionCardComponent {
  public isEditing: boolean = false;
  public collectionName: string = '';

  @Output() collectionCreated = new EventEmitter<{ shelfName: string, images: string[] }>();

  startEditing() {
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
    this.collectionName = '';
  }

  saveCollection() {
    if (this.collectionName.trim()) {
      this.collectionCreated.emit({ shelfName: this.collectionName, images: [] });
      this.isEditing = false;
      this.collectionName = '';
    }
  }
}
