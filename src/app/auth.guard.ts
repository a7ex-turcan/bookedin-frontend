import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token'); // Replace with actual authentication check

  if (state.url === '/login' && isLoggedIn) {
    router.navigate(['/']);
    return false;
  }

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
