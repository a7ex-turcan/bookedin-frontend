import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { SearchBarComponent } from '../search/search-bar/search-bar.component';
import { UserStoreService } from '../../core/services/user-store.service';
import { Observable } from 'rxjs';
import { User } from '../../core/users/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  imports: [
    SideMenuComponent,
    TopMenuComponent,
    SearchBarComponent,
    RouterOutlet,
    RouterLink,
    CommonModule
  ],
  styleUrls: ['./root.component.sass']
})
export class RootComponent {
  user$: Observable<User | null>;

  constructor(
    private router: Router,
    private userStore: UserStoreService
  ) {
    this.user$ = this.userStore.user$;
  }

  signOut() {
    // Clear user session or token here
    localStorage.removeItem('token');
    // Redirect to login page
    void this.router.navigate(['/login']);
  }
}
