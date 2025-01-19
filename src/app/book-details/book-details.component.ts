import { Component, Input, OnInit } from '@angular/core';
import { BookDetails } from '../../core/books/book-details.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.sass']
})
export class BookDetailsComponent implements OnInit {
  @Input() workId!: string;
  book: BookDetails | null = null;

  ngOnInit() {
    // Dummy book data
    this.book = {
      authors: ['Author One', 'Author Two'],
      title: 'Dummy Book Title',
      coverId: 1,
      workId: this.workId,
      description: 'This is a dummy description of the book.',
      subjects: ['Subject One', 'Subject Two']
    };
  }
}
