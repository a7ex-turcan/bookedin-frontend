import {HttpRequest, HttpHandlerFn } from '@angular/common/http';


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const token = localStorage.getItem('token');

  if (!token) return next(req);

  // Clone the request to add the authentication header.
  const newReq = req.clone({
    headers: req.headers.append('Authorization', 'Bearer ' + token),
  });
  return next(newReq);
}
