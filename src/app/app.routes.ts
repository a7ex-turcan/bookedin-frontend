import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {authGuard, redirectIfAuthGuard} from './auth.guard';
import {AppComponent} from './app.component';
import {RootComponent} from './root/root.component';
import {BookDetailsComponent} from './book-details/book-details.component';
import {UserFavoritesComponent} from './user-favorites/user-favorites.component';
import {SearchResultsComponent} from './search/search-results/search-results.component';
import {SearchResultsBooksComponent} from './search/search-results/search-results-books/search-results-books.component';
import {SearchResultsReadersComponent} from './search/search-results/search-results-readers/search-results-readers.component';
import {SearchResultsAuthorsComponent} from './search/search-results/search-results-authors/search-results-authors.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: AppComponent,
    children: [
      {
        path: '', component: RootComponent,
        children: [
          {path: 'books/:workId', component: BookDetailsComponent},
          {path: 'favorites', component: UserFavoritesComponent},
          {
            path: 'search-results',
            component: SearchResultsComponent,
            children: [
              {path: '', redirectTo: 'books', pathMatch: 'full'},
              {path: 'books', component: SearchResultsBooksComponent},
              {path: 'readers', component: SearchResultsReadersComponent},
              {path: 'authors', component: SearchResultsAuthorsComponent}
            ]
          }
        ],
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [redirectIfAuthGuard],
  },
];
