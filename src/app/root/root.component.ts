import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { SearchBarComponent } from '../search/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  imports: [
    SideMenuComponent,
    TopMenuComponent,
    SearchBarComponent,
    RouterOutlet,
    RouterLink
  ],
  styleUrls: ['./root.component.sass']
})
export class RootComponent {
  constructor(private router: Router) {}

  signOut() {
    // Clear user session or token here
    localStorage.removeItem('token');
    // Redirect to login page
    void this.router.navigate(['/login']);
  }
}
