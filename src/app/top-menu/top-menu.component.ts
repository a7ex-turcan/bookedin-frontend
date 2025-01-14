import { Component } from '@angular/core';
import {AvatarComponent} from '../../shared/avatar/avatar.component';

@Component({
  selector: 'app-top-menu',
  imports: [
    AvatarComponent
  ],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.sass'
})
export class TopMenuComponent {

}
