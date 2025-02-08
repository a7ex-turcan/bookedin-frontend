import { Component, Input } from '@angular/core';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { CommonModule, NgStyle } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../core/users/user.model';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [
    AvatarComponent,
    NgStyle,
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.sass']
})
export class TopMenuComponent {
  @Input() backgroundImageUrl: string = '';
  @Input() user: User | null = null;
}
