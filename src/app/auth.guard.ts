import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token'); // Replace with actual authentication check

  if (!isLoggedIn) {
    void router.navigate(['/login']);
    return false;
  }

  return true;
};

export const redirectIfAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token'); // Replace with actual authentication check

  if (isLoggedIn) {
    void router.navigate(['/']);
    return false;
  }

  return true;
};
