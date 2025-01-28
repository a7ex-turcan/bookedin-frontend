import { Component, Input, OnInit } from '@angular/core';
import { ShelfCardComponent } from '../shelf-card/shelf-card.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-shelf-list',
  templateUrl: './shelf-list.component.html',
  imports: [
    ShelfCardComponent,
    NgForOf
  ],
  styleUrls: ['./shelf-list.component.sass']
})
export class ShelfListComponent implements OnInit {
  @Input() shelves: { shelfName: string, images: string[] }[] = [];

  constructor() { }

  ngOnInit(): void { }
}
