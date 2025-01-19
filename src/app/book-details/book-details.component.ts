// src/app/book-details/book-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookDetails } from '../../core/books/book-details.model';
import { BookService } from '../../core/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.sass']
})
export class BookDetailsComponent implements OnInit {
  book: BookDetails | null = null;
  authorsList: string = '';

  constructor(private bookService: BookService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const workId = params.get('workId');
      if (workId) {
        this.bookService.getBookDetails(workId).subscribe(
          (bookDetails) => {
            this.book = bookDetails;
            this.authorsList = (bookDetails.authors ?? []).map(author => author.name).join(', ');
          },
          (error) => {
            console.error('Error fetching book details:', error);
          }
        );
      }
    });
  }
}
