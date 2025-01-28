import { Component } from '@angular/core';
import {ShelfListComponent} from '../../shared/shelf-list/shelf-list.component';

@Component({
  selector: 'app-user-shelves',
  templateUrl: './user-shelves.component.html',
  imports: [
    ShelfListComponent
  ],
  styleUrls: ['./user-shelves.component.sass']
})
export class UserShelvesComponent {
  dummyShelves = [
    {
      shelfName: 'My Favorite Books',
      mainImageUrl: 'path/to/main/image1.jpg',
      additionalImageUrls: ['path/to/image1.jpg', 'path/to/image2.jpg']
    },
    {
      shelfName: 'To Read',
      mainImageUrl: 'path/to/main/image2.jpg',
      additionalImageUrls: ['path/to/image3.jpg', 'path/to/image4.jpg']
    }
  ];
}
