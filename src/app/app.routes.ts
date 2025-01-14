import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { RootComponent } from './root/root.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: AppComponent,
    children: [
      { path: '', component: RootComponent },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
];
