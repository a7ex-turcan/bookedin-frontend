import { Component, Input } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

interface ShelveItem {
  name: string;
  isShelved: boolean;
}

@Component({
  selector: 'app-shelve',
  templateUrl: './shelve.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./shelve.component.sass']
})
export class ShelveComponent {
  @Input() items: ShelveItem[] = [];
  showFlyout = false;

  onAddBook() {
    this.showFlyout = !this.showFlyout;
  }
}
