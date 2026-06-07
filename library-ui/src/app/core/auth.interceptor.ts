import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  catchError,
  switchMap,
  throwError
} from 'rxjs';
import { HttpService } from '../services/httpservice';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const authService = inject(HttpService);

  const accessToken = localStorage.getItem('token');

  const publicUrls = [
    '/auth/login',
    '/auth/refresh'
  ];

  const isPublic = publicUrls.some(
    url => req.url.includes(url)
  );

  let authReq = req;

  if (accessToken && !isPublic) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  return next(authReq).pipe(

    catchError((error: HttpErrorResponse) => {

      if (error.status === 401 && !isPublic) {

        return authService.refreshToken().pipe(

          switchMap((response: any) => {

            localStorage.setItem(
              'token',
              response.accessToken
            );

            if (response.refreshToken) {
              localStorage.setItem(
                'refreshToken',
                response.refreshToken
              );
            }

            const retryRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`
              }
            });

            return next(retryRequest);
          }),

          catchError(refreshError => {

            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');

            router.navigate(['/auth']);

            return throwError(() => refreshError);
          })
        );
      }

      if (error.status === 403) {
        router.navigate(['/access-denied']);
      }

      return throwError(() => error);
    })
  );
};