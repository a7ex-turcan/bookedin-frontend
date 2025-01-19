// app.routes.ts
import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {authGuard, redirectIfAuthGuard} from './auth.guard';
import {AppComponent} from './app.component';
import {RootComponent} from './root/root.component';
import {BookDetailsComponent} from './book-details/book-details.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: AppComponent,
    children: [
      {
        path: '', component: RootComponent,
        children: [{path: 'books/:workId', component: BookDetailsComponent}]
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [redirectIfAuthGuard],
  },
];
