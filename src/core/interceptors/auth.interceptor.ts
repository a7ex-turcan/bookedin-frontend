import {HttpRequest, HttpHandlerFn, HttpEvent} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        // Handle 401 error by logging out the user
        localStorage.removeItem('token');
        void router.navigate(['/login']);
      }
      return throwError(err);
    })
  );
}
