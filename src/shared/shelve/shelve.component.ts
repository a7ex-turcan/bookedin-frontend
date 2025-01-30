import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-shelve',
  imports: [],
  templateUrl: './shelve.component.html',
  styleUrl: './shelve.component.sass'
})
export class ShelveComponent {
  @Output() bookAdded = new EventEmitter<void>();

  onAddBook() {
    this.bookAdded.emit();
  }
}
