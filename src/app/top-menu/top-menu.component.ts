import { Component, Input } from '@angular/core';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-top-menu',
  imports: [
    AvatarComponent,
    NgStyle
  ],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.sass'
})
export class TopMenuComponent {
  @Input() backgroundImageUrl: string = '';
}
