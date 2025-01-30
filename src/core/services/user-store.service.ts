import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import {UserService} from './users.service';
import {User} from '../users/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private userService: UserService) {}

  loadUser(): Observable<User | null> {
    if (this.userSubject.value) {
      return of(this.userSubject.value);
    } else {
      return this.userService.getCurrentUser().pipe(
        tap(user => this.userSubject.next(user))
      );
    }
  }

  getUser(): User | null {
    return this.userSubject.value;
  }
}
