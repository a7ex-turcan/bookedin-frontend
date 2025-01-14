import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserProfileComponent} from '../user-profile/user-profile.component';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  imports: [
    UserProfileComponent
  ],
  styleUrls: ['./root.component.sass']
})
export class RootComponent {
  constructor(private router: Router) {}

  signOut() {
    // Clear user session or token here
    localStorage.removeItem('token');
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
