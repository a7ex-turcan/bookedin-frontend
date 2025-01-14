import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.sass'
})
export class AvatarComponent implements OnInit {
  @Input() name: string = '';
  @Input() imageUrl: string | null = null;
  initials: string = '';

  ngOnInit(): void {
    this.initials = this.getInitials(this.name);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}
