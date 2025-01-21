import { Component, Input } from '@angular/core';
import { BookDetails } from '../../core/books/book-details.model';
import {join} from '@angular/compiler-cli';
import {AuthorsListPipe} from '../../core/pipes/author-list.pipe';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  imports: [
    AuthorsListPipe,
    NgIf,
    // AuthorsListPipe,
    // NgIf
  ],
  styleUrls: ['./book-card.component.sass']
})
export class BookCardComponent {
  @Input() book: BookDetails | null = null;
}
