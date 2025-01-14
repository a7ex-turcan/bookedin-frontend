import { Component, Input } from '@angular/core';
import {AvatarComponent} from '../../shared/avatar/avatar.component';
import {NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  imports: [
    AvatarComponent,
    NgStyle,
    NgIf
  ],
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent {
  @Input() backgroundImageUrl: string | null = null;
}
