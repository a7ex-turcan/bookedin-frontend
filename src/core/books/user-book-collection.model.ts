import {Book} from './book.model';
import {User} from '../users/user.model';

export interface UserBookCollection {
  id: string;
  collectionName: string;
  books: Book[];
  user: User;
  created: Date;
  lastUpdated: Date;
}
