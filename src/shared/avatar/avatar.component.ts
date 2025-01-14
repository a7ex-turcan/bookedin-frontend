import { Component, Input, OnInit } from '@angular/core';
import {NgClass, NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-avatar',
  imports: [
    NgIf,
    NgStyle,
    NgClass
  ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.sass'
})
export class AvatarComponent implements OnInit {
  @Input() name: string = '';
  @Input() imageUrl: string | null = null;
  @Input() backgroundColor: string = '';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  initials: string = '';

  ngOnInit(): void {
    this.initials = this.getInitials(this.name);
    if (!this.backgroundColor) {
      this.backgroundColor = this.getBackgroundColor(this.initials);
    }
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getBackgroundColor(initials: string): string {
    const colors = [
      '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8C33',
      '#33FFF5', '#8C33FF', '#FF3333', '#33FF8C', '#FF5733'
    ];
    const charCodeSum = initials.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charCodeSum % colors.length];
  }

  get positionClasses() {
    return {
      'flex-col': this.position === 'bottom' || this.position === 'top',
      'flex-row': this.position === 'left' || this.position === 'right',
      'items-start': this.position === 'top',
      'items-end': this.position === 'bottom',
      'justify-start': this.position === 'left',
      'justify-end': this.position === 'right'
    };
  }
}
