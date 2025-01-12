import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {authGuard} from './auth.guard';
import {AppComponent} from './app.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: AppComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
