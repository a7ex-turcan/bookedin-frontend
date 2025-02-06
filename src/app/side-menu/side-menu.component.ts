import { Component, Input } from '@angular/core';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserStoreService } from '../../core/services/user-store.service';
import { Observable } from 'rxjs';
import { User } from '../../core/users/user.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  standalone: true,
  imports: [
    AvatarComponent,
    NgStyle,
    NgIf,
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent {
  
  @Input() backgroundImageUrl: string | null = null;

  user$: Observable<User | null>;

  constructor(private userStore: UserStoreService) {
    this.user$ = this.userStore.user$;
  }
}
