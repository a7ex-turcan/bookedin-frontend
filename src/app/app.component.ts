import {Component, OnInit} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {UserStoreService} from '../core/services/user-store.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {
  title = 'BookedId.FrontEnd';

  constructor(private userStoreService: UserStoreService) {}

  ngOnInit(): void {
    this.userStoreService.loadUser().subscribe({
      next: user => console.log('User loaded:', user),
      error: error => console.error('Error loading user:', error)
    });
  }
}
