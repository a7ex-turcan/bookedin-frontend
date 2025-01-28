import { Component } from '@angular/core';
import { ShelfListComponent } from '../../shared/shelf-list/shelf-list.component';

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

      images: [
        'https://archive.org/download/l_covers_0010/l_covers_0010_54.zip/0010544254-L.jpg',
        'https://archive.org/download/l_covers_0008/l_covers_0008_15.zip/0008153054-L.jpg',
        'https://archive.org/download/l_covers_0008/l_covers_0008_49.zip/0008494659-L.jpg'
      ]
    },
    {
      shelfName: 'To Read',
      images: [
        'https://archive.org/download/l_covers_0008/l_covers_0008_15.zip/0008153054-L.jpg',
        'https://archive.org/download/l_covers_0008/l_covers_0008_23.zip/0008238803-L.jpg',
      ]
    }
  ];
}
