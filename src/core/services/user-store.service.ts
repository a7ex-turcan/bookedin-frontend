import { Injectable } from '@angular/core';
import { UserService, User } from './users.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private userService: UserService) {}

  loadUser(): Observable<User | null> {
    return this.userService.getCurrentUser().pipe(
      tap(user => this.userSubject.next(user))
    );
  }

  getUser(): User | null {
    return this.userSubject.value;
  }
}
