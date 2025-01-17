// src/shared/search-result/search-result.component.ts
import { Component, Input } from '@angular/core';
import { SearchResult } from './search-result';
import {NgIf} from '@angular/common';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  imports: [
    NgIf,
    NgxSkeletonLoaderModule
  ],
  styleUrls: ['./search-result.component.sass']
})
export class SearchResultComponent {
  @Input() result!: SearchResult;
  imageLoaded = false;

  onImageLoad() {
    this.imageLoaded = true;
  }
}
