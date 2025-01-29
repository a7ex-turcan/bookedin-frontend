import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

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

  startEditing() {
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
    this.collectionName = '';
  }

  saveCollection() {
    // Logic to save the collection (to be implemented later)
    this.isEditing = false;
    this.collectionName = '';
  }
}
