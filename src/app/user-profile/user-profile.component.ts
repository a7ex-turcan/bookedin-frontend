import { Component } from '@angular/core';
import {AvatarComponent} from '../../shared/avatar/avatar.component';

@Component({
  selector: 'app-user-profile',
  imports: [
    AvatarComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.sass'
})
export class UserProfileComponent {

}
