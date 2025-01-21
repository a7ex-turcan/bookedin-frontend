import { Component, Input } from '@angular/core';
import {AvatarComponent} from '../../shared/avatar/avatar.component';
import {NgIf, NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  imports: [
    AvatarComponent,
    NgStyle,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent {
  @Input() backgroundImageUrl: string | null = null;
}
