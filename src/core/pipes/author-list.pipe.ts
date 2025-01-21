import { Pipe, PipeTransform } from '@angular/core';
import {Author} from '../books/author.model';

@Pipe({
  name: 'authorsList'
})
export class AuthorsListPipe implements PipeTransform {
  transform(authors: Author[]): string {
    return authors.map(author => author.name).join(', ');
  }
}
