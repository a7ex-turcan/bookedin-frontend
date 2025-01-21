// src/core/books/book.model.ts

export interface Book {
  authors: string[];
  title: string;
  coverId: number;
  workId: string;
  isFavorite: boolean;
}
