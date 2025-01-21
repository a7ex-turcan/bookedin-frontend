import { Component, OnInit } from '@angular/core';
import { BookDetails } from '../../core/books/book-details.model';
import {BookCardComponent} from '../../shared/book-card/book-card.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  imports: [
    BookCardComponent,
    NgForOf
  ],
  styleUrls: ['./user-favorites.component.sass']
})
export class UserFavoritesComponent implements OnInit {
  favoriteBooks: BookDetails[] = [];

  ngOnInit() {
    // Dummy data for now
    this.favoriteBooks = [
      {
        authors: [{ name: 'Author 1', key: 'OL1A' }],
        title: 'Book Title 1',
        coverId: 1,
        workId: '1',
        description: 'Description 1',
        subjects: ['Subject 1'],
        isFavorite: true
      },
      {
        authors: [{ name: 'Author 2', key: 'OL1A' }],
        title: 'Book Title 2',
        coverId: 2,
        workId: '2',
        description: 'Description 2',
        subjects: ['Subject 2'],
        isFavorite: true
      },
      // Add more dummy books as needed
    ];
  }
}
