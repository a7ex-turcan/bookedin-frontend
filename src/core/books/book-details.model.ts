import { Author } from './author.model';

export interface BookDetails {
  authors: Author[];
  title: string;
  coverId: number;
  workId: string;
  description: string;
  subjects: string[];
}
