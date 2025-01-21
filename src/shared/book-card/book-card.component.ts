import { Component, Input } from '@angular/core';
import { BookDetails } from '../../core/books/book-details.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.sass']
})
export class BookCardComponent {
  @Input() book: BookDetails | null = null;
}
