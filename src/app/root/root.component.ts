import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
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
